const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/chat/completions";
const ALLOWED_ORIGINS = new Set([
  "https://jedi0310.github.io",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5500",
  "null",
]);

const REPORT_SYSTEM_PROMPT = `你是一个中文 AI 协同能力教练。请基于用户的结构化诊断结果，生成一份短报告。

硬性要求：
1. 只使用输入中的 level、raw_score、dimension_scores、evidence、bottleneck、next_breakthrough、collaboration_modes 和 selected_answers，不要重新计算等级。
2. 自然使用用户的名字/网名，并结合用户的行业和职业来写建议。
3. 输出 Markdown，不输出 JSON，不要包裹代码块。
4. 必须包含这些小节：标题、用户画像引用、当前等级、四维分析、当前瓶颈、下一阶段升级路线、3 条具体行动建议、推荐 AI 协同方式、最后提醒。
5. 风格中文、直接、具体、专业克制；鼓励但不夸张，不制造焦虑。
6. 少讲概念，多告诉用户下一步怎么做。
7. 不要要求用户提供手机号、身份证、公司机密、API Key 或其他敏感信息。`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    try {
      if (url.pathname === "/api/health" && request.method === "GET") {
        return json(request, { ok: true, service: "ai-test-deepseek-proxy" });
      }

      if (url.pathname === "/api/report" && request.method === "POST") {
        return handleReport(request, env);
      }

      if (url.pathname === "/api/admin/reports" && request.method === "GET") {
        return handleAdminReports(request, env);
      }

      const detailMatch = url.pathname.match(/^\/api\/admin\/reports\/([^/]+)$/);
      if (detailMatch && request.method === "GET") {
        return handleAdminReportDetail(request, env, detailMatch[1]);
      }

      return json(request, { ok: false, message: "Not found" }, 404);
    } catch (error) {
      return json(request, { ok: false, message: publicErrorMessage(error) }, error.status || 500);
    }
  },
};

async function handleReport(request, env) {
  requireEnv(env, "DEEPSEEK_API_KEY");
  requireEnv(env, "ADMIN_TOKEN");
  requireEnv(env, "DB");

  const payload = await readJson(request);
  validatePayload(payload);

  const deepseekResponse = await fetch(DEEPSEEK_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: REPORT_SYSTEM_PROMPT },
        { role: "user", content: JSON.stringify(payload, null, 2) },
      ],
      temperature: 0.7,
    }),
  });

  if (!deepseekResponse.ok) {
    throw httpError(502, `DeepSeek request failed: ${deepseekResponse.status}`);
  }

  const deepseekData = await deepseekResponse.json();
  const reportMarkdown = deepseekData?.choices?.[0]?.message?.content?.trim();
  if (!reportMarkdown) throw httpError(502, "DeepSeek returned empty report");

  const submissionId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const userAgent = request.headers.get("User-Agent") || "";
  const ipHash = await hashIp(request.headers.get("CF-Connecting-IP") || "", env.ADMIN_TOKEN || "");

  await env.DB.prepare(
    `INSERT INTO submissions (
      id, created_at, name, industry, role, level, raw_score, dimension_scores,
      evidence_json, bottleneck, next_breakthrough, collaboration_modes_json,
      answers_json, report_markdown, source_url, user_agent, ip_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      submissionId,
      createdAt,
      text(payload.profile?.name),
      text(payload.profile?.industry),
      text(payload.profile?.role),
      text(payload.level),
      Number(payload.raw_score || 0),
      JSON.stringify(payload.dimension_scores || {}),
      JSON.stringify(payload.evidence || []),
      text(payload.bottleneck),
      text(payload.next_breakthrough),
      JSON.stringify(payload.collaboration_modes || []),
      JSON.stringify(payload.selected_answers || []),
      reportMarkdown,
      text(payload.source_url),
      userAgent,
      ipHash
    )
    .run();

  return json(request, {
    ok: true,
    submission_id: submissionId,
    report_markdown: reportMarkdown,
  });
}

async function handleAdminReports(request, env) {
  requireAdmin(request, env);
  requireEnv(env, "DB");

  const url = new URL(request.url);
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || 50), 1), 100);
  const offset = Math.max(Number(url.searchParams.get("offset") || 0), 0);
  const result = await env.DB.prepare(
    `SELECT id, created_at, name, industry, role, level, raw_score,
      dimension_scores, bottleneck, next_breakthrough, source_url, user_agent, ip_hash
     FROM submissions
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`
  )
    .bind(limit, offset)
    .all();

  return json(request, { ok: true, items: result.results || [], limit, offset });
}

async function handleAdminReportDetail(request, env, id) {
  requireAdmin(request, env);
  requireEnv(env, "DB");

  const result = await env.DB.prepare("SELECT * FROM submissions WHERE id = ?").bind(id).first();
  if (!result) return json(request, { ok: false, message: "Report not found" }, 404);
  return json(request, { ok: true, item: result });
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") throw httpError(400, "Invalid payload");
  if (!payload.profile || typeof payload.profile !== "object") throw httpError(400, "Missing profile");
  if (!payload.profile.name || String(payload.profile.name).trim().length > 64) {
    throw httpError(400, "Invalid profile name");
  }
  if (!payload.level || typeof payload.level !== "string") throw httpError(400, "Missing level");
  if (!payload.dimension_scores || typeof payload.dimension_scores !== "object") {
    throw httpError(400, "Missing dimension scores");
  }
  if (!Array.isArray(payload.selected_answers)) throw httpError(400, "Missing selected answers");
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw httpError(400, "Invalid JSON");
  }
}

function requireAdmin(request, env) {
  requireEnv(env, "ADMIN_TOKEN");
  const auth = request.headers.get("Authorization") || "";
  if (auth !== `Bearer ${env.ADMIN_TOKEN}`) throw httpError(401, "Unauthorized");
}

function requireEnv(env, key) {
  if (!env[key]) throw httpError(500, `${key} is not configured`);
}

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://jedi0310.github.io";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(request, body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(request),
    },
  });
}

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function publicErrorMessage(error) {
  if (error.status && error.status < 500) return error.message;
  if (error.message?.includes("DeepSeek request failed")) return "DeepSeek 生成失败，请稍后重试";
  if (error.message?.includes("DeepSeek returned empty report")) return "DeepSeek 没有返回报告内容";
  return "服务暂时不可用，请稍后重试";
}

function text(value) {
  return String(value || "").trim().slice(0, 500);
}

async function hashIp(ip, salt) {
  if (!ip) return "";
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
