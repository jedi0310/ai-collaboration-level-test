# DeepSeek Cloudflare Worker 公开测试版部署指南

## 目标

公开测试版不让访问者填写 DeepSeek API Key。前端部署在 GitHub Pages，报告生成请求发到 Cloudflare Worker，由 Worker 读取 Cloudflare Secret 中的 `DEEPSEEK_API_KEY` 调用 DeepSeek，并把测试结果和报告保存到 D1 数据库。

不要把 DeepSeek API Key、`ADMIN_TOKEN`、Cloudflare token 或任何密码发到聊天里，也不要写进代码或文档。

## 当前约定

- Worker 名称建议：`ai-test-deepseek-proxy`
- Worker URL 当前前端默认使用：`https://ai-test-deepseek-proxy.jedi0310.workers.dev/api/report`
- D1 数据库名称：`ai-test-reports`
- D1 binding 名称：`DB`
- Worker secrets：
  - `DEEPSEEK_API_KEY`
  - `ADMIN_TOKEN`

如果 Worker 名称或 workers.dev 子域不同，需要修改 `app.js` 里的 `WORKER_REPORT_ENDPOINT`。

## 文件说明

```text
cloudflare-worker/worker.js
cloudflare-worker/schema.sql
cloudflare-worker/wrangler.toml.example
```

- `worker.js`：Cloudflare Worker 代理代码，包含报告生成、健康检查和后台查询接口。
- `schema.sql`：D1 数据库表结构。
- `wrangler.toml.example`：命令行部署示例，只包含占位符，不包含真实账号 ID 或密钥。

## Worker 接口

### POST /api/report

前端调用。接收本地评分结果，调用 DeepSeek，保存 D1，返回：

```json
{
  "ok": true,
  "submission_id": "...",
  "report_markdown": "..."
}
```

失败时返回：

```json
{
  "ok": false,
  "message": "..."
}
```

### GET /api/health

健康检查，不暴露密钥状态。

### GET /api/admin/reports

后台列表接口，需要请求头：

```text
Authorization: Bearer <ADMIN_TOKEN>
```

支持参数：

```text
limit=50
offset=0
```

### GET /api/admin/reports/:id

后台详情接口，需要同样的 `Authorization` 请求头。

## D1 表结构

运行 `cloudflare-worker/schema.sql`，创建 `submissions` 表。字段包括：

- `id`
- `created_at`
- `name`
- `industry`
- `role`
- `level`
- `raw_score`
- `dimension_scores`
- `evidence_json`
- `bottleneck`
- `next_breakthrough`
- `collaboration_modes_json`
- `answers_json`
- `report_markdown`
- `source_url`
- `user_agent`
- `ip_hash`

IP 不保存明文，只保存 hash。

## Cloudflare 后台部署步骤

### 1. 创建或确认 D1 数据库

用户已创建 D1 数据库：

```text
ai-test-reports
```

### 2. 运行 D1 schema

在 Cloudflare D1 控制台中找到 `ai-test-reports`，打开控制台或 Query 页面，把 `cloudflare-worker/schema.sql` 的内容粘贴进去运行。

### 3. 创建 Worker

1. 打开 Cloudflare 控制台。
2. 进入 `Workers & Pages`。
3. 创建 Worker。
4. Worker 名称建议使用：

```text
ai-test-deepseek-proxy
```

5. 把 `cloudflare-worker/worker.js` 的内容复制到 Worker 编辑器。

### 4. 配置 D1 binding

在 Worker 设置中添加 D1 database binding：

```text
Variable name / Binding name: DB
D1 database: ai-test-reports
```

binding 名称必须是 `DB`，因为 Worker 代码使用 `env.DB`。

### 5. 配置 Secrets

在 Worker 设置中添加 Secrets：

```text
DEEPSEEK_API_KEY
ADMIN_TOKEN
```

注意：

- `DEEPSEEK_API_KEY` 填用户自己的 DeepSeek Key。
- `ADMIN_TOKEN` 填一个只有站长知道的长随机字符串。
- 这两个值只在 Cloudflare 后台填写，不发给 agent，不写进 GitHub。

### 6. 部署 Worker

保存并部署 Worker 后，先访问：

```text
https://ai-test-deepseek-proxy.jedi0310.workers.dev/api/health
```

如果返回 `ok: true`，说明 Worker 基础可访问。

### 7. 确认前端 endpoint

当前 `app.js` 默认：

```text
https://ai-test-deepseek-proxy.jedi0310.workers.dev/api/report
```

如果 Cloudflare 显示的 Worker URL 不一样，需要修改 `WORKER_REPORT_ENDPOINT` 后重新提交并 push GitHub Pages。

### 8. 上线验证

1. 打开 GitHub Pages 网站。
2. 填写名字/网名、行业、职业。
3. 完成 8 道题。
4. 页面会自动请求 Worker 生成 DeepSeek 报告。
5. 如果 Worker 或 DeepSeek 失败，页面会保留基础模板报告。
6. 点击 `下载/保存 PDF`，在浏览器打印窗口选择保存为 PDF。
7. 用 admin endpoint 检查 D1 是否有记录。

## Admin endpoint 查看方式

在浏览器直接访问带 Authorization header 不方便，建议用 Postman、Hoppscotch 或 curl。

示例命令中的 token 是占位符，不要把真实 token 写进文档：

```bash
curl -H "Authorization: Bearer <ADMIN_TOKEN>" \
  "https://ai-test-deepseek-proxy.jedi0310.workers.dev/api/admin/reports?limit=20"
```

查看单条：

```bash
curl -H "Authorization: Bearer <ADMIN_TOKEN>" \
  "https://ai-test-deepseek-proxy.jedi0310.workers.dev/api/admin/reports/<submission_id>"
```

## 隐私提示

公开测试版会保存：

- 名字/网名
- 行业
- 职业
- 答题结果
- 生成报告

用途是改进测试体验。页面已提醒访问者不要填写手机号、身份证、详细地址、公司机密等敏感信息。

## 故障排查

- 前端显示基础报告：检查 Worker 是否部署、endpoint 是否正确、CORS 是否允许 `https://jedi0310.github.io`。
- Worker 返回 `service unavailable`：检查 `DEEPSEEK_API_KEY` 和 `ADMIN_TOKEN` 是否已在 Cloudflare Secrets 配置。
- D1 没有记录：检查 D1 binding 名称是否为 `DB`，以及 schema 是否已运行。
- Admin 接口 401：检查 `Authorization: Bearer <ADMIN_TOKEN>` 是否正确。
- DeepSeek 失败：检查 DeepSeek Key 是否有效、账户余额是否足够、DeepSeek 服务是否可用。
