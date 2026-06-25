const DIMENSIONS = {
  control: {
    name: "表达清晰度",
    description: "能否用背景、目标、格式、例子和标准把需求说清楚",
    anchors: ["Lv.0 一句话需求", "Lv.3 有背景有格式", "Lv.5 有样例有标准", "Lv.8 有自查机制"],
  },
  breadth: {
    name: "场景迁移度",
    description: "是否把 AI 用到多类真实任务，而不是只查资料或闲聊",
    anchors: ["Lv.0 未使用", "Lv.3 2-3 类场景", "Lv.6 5 类以上", "Lv.9 遇新任务先想 AI"],
  },
  form: {
    name: "流程协作度",
    description: "是否让 AI 参与多步骤任务、工具操作或连续执行",
    anchors: ["Lv.0 单次问答", "Lv.4 有固定步骤", "Lv.7 连续执行/Agent", "Lv.10 全自动流程"],
  },
  role: {
    name: "资产沉淀度",
    description: "是否把有效方法沉淀成模板、资料包、检查清单或流程",
    anchors: ["Lv.0 无沉淀", "Lv.4 零散保存", "Lv.7 有固定模板", "Lv.10 可复用系统"],
  },
};

const LEVELS = [
  { id: 0, name: "Lv.0 旁观者", summary: "AI 还没有进入你的真实任务。" },
  { id: 1, name: "Lv.1 尝鲜者", summary: "你会试用 AI，但还没有稳定使用方式。" },
  { id: 2, name: "Lv.2 对话者", summary: "你能用 AI 完成简单问答和基础生成。" },
  { id: 3, name: "Lv.3 驯化师", summary: "你知道 AI 不是算命的，但还在第一轮才补条件。" },
  { id: 4, name: "Lv.4 越境者", summary: "你把 AI 带到了更多任务里，不只是聊天。" },
  { id: 5, name: "Lv.5 织网者", summary: "你已经形成一些稳定的 AI 工作套路。" },
  { id: 6, name: "Lv.6 召唤师", summary: "你开始让 AI 处理连续步骤和工具任务。" },
  { id: 7, name: "Lv.7 铸造师", summary: "你开始打造自己的模板、资料包和流程。" },
  { id: 8, name: "Lv.8 造物主", summary: "AI 已深度参与从想法到交付的过程。" },
  { id: 9, name: "Lv.9 觉醒者", summary: "AI 协作已经成为你的工作方法论。" },
  { id: 10, name: "Lv.10 一人军团", summary: "你拥有可复用、可扩展的个人 AI 系统。" },
];

const SCENARIO_LIST = [
  "写作（文案/文章/脚本）",
  "学习（解释概念/出练习题/做总结）",
  "图片/视频生成或编辑",
  "表格/数据处理/分析",
  "方案策划/头脑风暴",
  "代码/脚本/工具",
  "求职（简历/面试准备/职业规划）",
  "生活规划（旅行/理财/健康/决策）",
];

const QUESTIONS = [
  {
    id: "frequency",
    label: "真实使用",
    title: "过去 30 天，你用 AI 完成过多少个真实任务？",
    hint: "只算真的帮你完成了某件事：写完一段内容、改完一份材料、整理出一个表格、做出一个方案等。",
    options: [
      {
        title: "0 个",
        desc: "看过、听过、试过两句，但没有拿它完成过具体任务。",
        score: 0,
        dims: { control: 0, breadth: 0, form: 0, role: 0 },
        evidence: "还没有把 AI 用进真实任务",
      },
      {
        title: "1-2 个",
        desc: "偶尔让 AI 查资料、改一句话或写一小段内容。",
        score: 1,
        dims: { control: 1, breadth: 0, form: 0, role: 0 },
        evidence: "AI 使用仍以偶发尝试为主",
      },
      {
        title: "3-10 个",
        desc: "每周会用几次，写作、总结、查询、改稿时会想到 AI。",
        score: 2,
        dims: { control: 1, breadth: 1, form: 0, role: 0 },
        evidence: "已经在常见任务中稳定使用 AI",
      },
      {
        title: "10-30 个",
        desc: "几乎每天都会用，经常来回改几轮，直到结果能交付。",
        score: 3,
        dims: { control: 2, breadth: 1, form: 1, role: 0 },
        evidence: "AI 已进入日常多轮协作",
      },
      {
        title: "30 个以上",
        desc: "深度日常依赖，AI 是我完成大部分任务的第一步动作。",
        score: 4,
        dims: { control: 3, breadth: 2, form: 2, role: 1 },
        evidence: "AI 已深度嵌入日常工作流",
      },
    ],
  },
  {
    id: "prompt_context",
    label: "提示词示例",
    title: "如果让 AI 写一段活动招募文案，你最可能怎么问？",
    hint: "选最接近你平时会输入的那一种。这里用具体例子减少“我好像都像”的情况。",
    options: [
      {
        title: "一句话需求",
        desc: "“帮我写一段活动招募文案。”",
        score: 0,
        dims: { control: 0, breadth: 0, form: 0, role: 0 },
        evidence: "提示方式仍以一句话需求为主",
      },
      {
        title: "说明基本目的",
        desc: "“帮我写一段小红书风格的活动招募文案，吸引更多人报名。”",
        score: 1,
        dims: { control: 1, breadth: 0, form: 0, role: 0 },
        evidence: "会给 AI 说明任务目的",
      },
      {
        title: "给出背景和格式",
        desc: "“对象是 25-35 岁职场人，活动是周末 AI 入门课。请写 3 个标题、1 段正文、3 个报名理由，语气专业但不夸张。”",
        score: 2,
        dims: { control: 3, breadth: 0, form: 0, role: 1 },
        evidence: "会用背景、格式和限制条件控制输出",
      },
      {
        title: "给目标、样例和验收标准",
        desc: "“先判断目标用户最关心什么，再写 3 版。参考语气：清楚、克制、具体。避免焦虑营销。最后按吸引力、可信度、行动明确度自评。”",
        score: 3,
        dims: { control: 4, breadth: 0, form: 1, role: 2 },
        evidence: "会给 AI 样例、标准和自查机制",
      },
    ],
  },
  {
    id: "bad_answer",
    label: "修正能力",
    title: "AI 写出来很空、很像套话时，你下一句最可能说什么？",
    hint: "这题看你是否能把一次不满意的回答修成可用结果。",
    options: [
      {
        title: "放弃这次结果",
        desc: "“算了，还是我自己写吧。”",
        score: 0,
        dims: { control: 0, breadth: 0, form: 0, role: 0 },
        evidence: "遇到低质量回答时容易直接放弃",
      },
      {
        title: "简单要求重写",
        desc: "“不够好，重新写一版。”",
        score: 1,
        dims: { control: 1, breadth: 0, form: 0, role: 0 },
        evidence: "会通过简单追问改善回答",
      },
      {
        title: "指出具体问题",
        desc: "“太空了。减少形容词，加入 3 个具体场景，每段不超过 60 字。”",
        score: 2,
        dims: { control: 3, breadth: 0, form: 0, role: 1 },
        evidence: "会用具体修改要求提升输出质量",
      },
      {
        title: "先诊断再重写",
        desc: "“先列出这版为什么像套话，再问我 3 个必要问题，然后重写，并用清单检查是否具体。”",
        score: 3,
        dims: { control: 4, breadth: 0, form: 1, role: 1 },
        evidence: "会让 AI 诊断问题、补信息并自检",
      },
    ],
  },
  {
    id: "breadth",
    label: "场景范围",
    title: "过去 30 天，你把 AI 用在过哪些类型的任务上？",
    hint: "勾选所有符合的项，不用全选。系统会根据你勾选的数量和类型判断。",
    multiSelect: true,
    scenarios: SCENARIO_LIST,
    options: [
      {
        title: "0-1 类",
        desc: "主要是查资料、解释概念，像一个更会说话的搜索框。",
        minCount: 0,
        maxCount: 1,
        score: 0,
        dims: { control: 0, breadth: 0, form: 0, role: 0 },
        evidence: "AI 使用场景仍集中在简单查询",
      },
      {
        title: "2 类",
        desc: "例如查资料 + 写文案，或学习 + 改简历。",
        minCount: 2,
        maxCount: 2,
        score: 1,
        dims: { control: 0, breadth: 1, form: 0, role: 0 },
        evidence: "AI 主要服务于少数固定任务",
      },
      {
        title: "3-4 类",
        desc: "已经会在写作、总结、表格、方案、学习、图片或代码里挑着用。",
        minCount: 3,
        maxCount: 4,
        score: 2,
        dims: { control: 0, breadth: 3, form: 0, role: 0 },
        evidence: "AI 已覆盖多个工作和学习场景",
      },
      {
        title: "5 类以上",
        desc: "遇到不熟的任务，也会先让 AI 帮你做初稿、原型、计划或检查。",
        minCount: 5,
        maxCount: 99,
        score: 3,
        dims: { control: 1, breadth: 4, form: 1, role: 1 },
        evidence: "会用 AI 跨场景完成探索和原型",
      },
    ],
  },
  {
    id: "workflow",
    label: "流程证据",
    title: "下面哪一种最像你处理高频任务的方式？",
    hint: "比如写周报、做选题、整理会议纪要、优化简历这类会重复出现的任务。",
    options: [
      {
        title: "每次临时问",
        desc: "没有固定步骤，想到什么问什么，做完就结束。",
        score: 0,
        dims: { control: 0, breadth: 0, form: 0, role: 0 },
        evidence: "暂时没有固定 AI 工作流程",
      },
      {
        title: "有一个常用动作",
        desc: "例如每次先让 AI 列提纲，或最后让 AI 检查错别字。",
        score: 1,
        dims: { control: 1, breadth: 0, form: 1, role: 0 },
        evidence: "已经形成一些个人 AI 使用习惯",
      },
      {
        title: "有 3 步以上固定流程",
        desc: "例如：给资料 → 列提纲 → 写初稿 → 按清单检查 → 改成最终版。",
        score: 2,
        dims: { control: 2, breadth: 0, form: 2, role: 2 },
        evidence: "已经沉淀固定指令、清单或资料包",
      },
      {
        title: "有可复用工作流",
        desc: "同一类任务可以稳定复用，资料、步骤、检查标准和输出格式都比较固定。",
        score: 3,
        dims: { control: 2, breadth: 1, form: 4, role: 2 },
        evidence: "AI 已经嵌入完整交付流程",
      },
    ],
  },
  {
    id: "agent_behavior",
    label: "Agent 行为",
    title: "下面哪种情况更接近你用过 AI 的方式？",
    hint: "看你实际有没有把 AI 用在连续任务或工具操作里，而不是只看你知道不知道 Agent 这个词。",
    options: [
      {
        title: "没有，AI 只负责单次问答",
        desc: "每次都是我问一句、它答一句，没有连续执行，也没有操作过文件或代码。",
        score: 0,
        dims: { control: 0, breadth: 0, form: 0, role: 0 },
        evidence: "还没有让 AI 执行连续步骤",
      },
      {
        title: "试过让 AI 改代码或处理文件",
        desc: "比如把一段代码粘给 AI 让它改，或让 AI 帮我整理一个表格或文件，但它还是会停下来等我确认。",
        score: 1,
        dims: { control: 0, breadth: 0, form: 2, role: 0 },
        evidence: "试过让 AI 操作文件或代码",
      },
      {
        title: "用过能连续执行的 AI 工具",
        desc: "例如 Cursor Agent、GitHub Copilot Workspace、浏览器 Agent 等，能连续执行多步直到完成。",
        score: 2,
        dims: { control: 1, breadth: 0, form: 4, role: 1 },
        evidence: "有使用连续执行 AI 工具的经验",
      },
      {
        title: "我设计了 AI 的执行流程",
        desc: "比如给 AI 写执行规则、接多个工具、或把 AI 流程沉淀成可复用的方法。",
        score: 3,
        dims: { control: 2, breadth: 1, form: 5, role: 3 },
        evidence: "会设计或定制 AI 执行流程",
      },
    ],
  },
  {
    id: "assets",
    label: "资产沉淀",
    title: "你有没有把好用的 AI 问法保存下来，下次继续用？",
    hint: "比如：一段固定提示词、一份参考案例、一套写作口吻、一张检查清单、一个做事步骤。只看你有没有把好用方法留下来。",
    options: [
      {
        title: "没有",
        desc: "每次都重新问，之前调好的说法很少再用。",
        score: 0,
        dims: { control: 0, breadth: 0, form: 0, role: 0 },
        evidence: "AI 使用经验还没有形成可复用资产",
      },
      {
        title: "有零散保存",
        desc: "收藏过几段好用指令，但比较散，靠复制粘贴复用。",
        score: 1,
        dims: { control: 1, breadth: 0, form: 0, role: 1 },
        evidence: "已经保存常用指令",
      },
      {
        title: "有固定模板或参考资料",
        desc: "比如一份固定提示词、一组案例、品牌语气、常用资料、检查清单。",
        score: 2,
        dims: { control: 2, breadth: 1, form: 1, role: 3 },
        evidence: "已经建立模板、资料包或知识库",
      },
      {
        title: "有别人也能照着用的流程",
        desc: "别人照着你的模板、资料和步骤，也能得到相对稳定的结果。",
        score: 3,
        dims: { control: 2, breadth: 1, form: 3, role: 5 },
        evidence: "会创造模板、自动化流程或团队可用方法",
      },
    ],
  },
  {
    id: "first_reaction",
    label: "协作设计",
    title: "如果现在要做一个 PPT，你会怎么让 AI 跟你一起完成？",
    hint: "用一个具体任务来判断你是拿 AI 找答案，还是会设计协作流程。",
    options: [
      {
        title: "先自己做，卡住再问",
        desc: "自己先写大纲、找资料、做页面，遇到写不出来或排不好时再问 AI。",
        score: 0,
        dims: { control: 0, breadth: 0, form: 0, role: 0 },
        evidence: "新任务中 AI 多作为事后补救工具",
      },
      {
        title: "先让 AI 给一份大纲",
        desc: "问“这个主题的 PPT 怎么做”，从它给的大纲和标题里挑一些能用的。",
        score: 1,
        dims: { control: 1, breadth: 0, form: 0, role: 0 },
        evidence: "新任务会先让 AI 提供参考答案",
      },
      {
        title: "先让 AI 拆任务",
        desc: "让它先拆成目标、受众、页数、结构、每页标题、资料缺口和视觉建议，再分步完成。",
        score: 2,
        dims: { control: 2, breadth: 1, form: 1, role: 1 },
        evidence: "会用 AI 一起拆解目标、步骤和风险",
      },
      {
        title: "先设计人机协作流程",
        desc: "你先定目标和判断标准，让 AI 负责资料整理、结构初稿、逐页文案和自查，你负责取舍和最终审美；最后沉淀成 PPT 模板。",
        score: 3,
        dims: { control: 3, breadth: 1, form: 2, role: 3 },
        evidence: "会为新任务设计人机协作流程",
      },
    ],
  },
];

const DAILY_REPORT_LIMIT = 3;
const REPORT_LIMIT_ENABLED = false;
const APP_VERSION = "public-worker-mvp-2026-06-18";
const WORKER_REPORT_ENDPOINT = "https://ai-test-deepseek-proxy.jedi0310.workers.dev/api/report";
const REPORT_REQUEST_TIMEOUT_MS = 45000;

const state = {
  screen: "start",
  current: 0,
  answers: {},
  multiSelections: {},
  optionOrder: {},
  profile: loadProfile(),
  profileDraft: { name: "", industry: "", role: "", contact: "" },
  diagnosis: null,
  aiReport: "",
  loadingReport: false,
  reportRequestId: 0,
  status: "",
  profileError: "",
};

const app = document.querySelector("#app");

function render() {
  if (state.screen === "start") renderStart();
  if (state.screen === "profile") renderProfile();
  if (state.screen === "question") renderQuestion();
  if (state.screen === "report") renderReport();
}

function renderStart() {
  app.innerHTML = `
    <section class="screen hero-screen">
      <header class="site-header">
        <div class="wordmark">AI 协同等级测试</div>
        <div class="header-meta">8 道题 · 看见你的下一步</div>
      </header>
      <div class="hero-grid">
        <section class="hero-copy-block">
          <p class="eyebrow">AI 协同能力诊断</p>
          <h1>看看你现在处在 AI 协作的哪一级。</h1>
          <p class="hero-copy">用 8 个具体场景，了解你当前的 AI 使用水平、四维能力画像，以及下一步最值得升级的动作。</p>
          <div class="start-actions">
            <button class="button" data-action="start">开始测试</button>
          </div>
        </section>
        <aside class="method-panel" aria-label="测试方法">
          <div class="method-row">
            <span>01</span>
            <div><strong>行为证据</strong><p>看过去 30 天做过什么，而不是靠自我感觉。</p></div>
          </div>
          <div class="method-row">
            <span>02</span>
            <div><strong>示例判断</strong><p>用具体提示词和 Agent 识别题减少模糊选择。</p></div>
          </div>
          <div class="method-row">
            <span>03</span>
            <div><strong>四维画像</strong><p>表达、场景、流程、沉淀四个维度分别诊断。</p></div>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function renderProfile() {
  const draft = state.profileDraft || { name: "", industry: "", role: "", contact: "" };
  app.innerHTML = `
    <section class="screen profile-screen">
      <header class="site-header">
        <button class="text-button" data-action="restart">AI 协同等级测试</button>
        <div class="header-meta">填写后报告更贴近你</div>
      </header>
      <div class="profile-layout">
        <section class="hero-copy-block">
          <p class="eyebrow">生成更像写给你的报告</p>
          <h1>先告诉我你是谁。</h1>
          <p class="hero-copy">DeepSeek 生成报告时，会结合你的名字、行业和职业来写建议。公开测试版会保存测试结果和生成报告，用于改进体验。</p>
        </section>
        <section class="profile-card">
          <label class="field">
            <span>名字或网名 *</span>
            <input id="profileName" autocomplete="off" maxlength="32" placeholder="" value="${escapeHtml(draft.name || "")}" />
          </label>
          <label class="field">
            <span>行业 *</span>
            <input id="profileIndustry" autocomplete="off" maxlength="40" placeholder="" value="${escapeHtml(draft.industry || "")}" />
          </label>
          <label class="field">
            <span>职位（选填）</span>
            <input id="profileRole" autocomplete="off" maxlength="48" placeholder="" value="${escapeHtml(draft.role || "")}" />
          </label>
          <label class="field">
            <span>手机号（选填）</span>
            <input id="profileContact" autocomplete="off" inputmode="tel" maxlength="32" placeholder="" value="${escapeHtml(draft.contact || "")}" />
          </label>
          ${state.profileError ? `<p class="form-error">${escapeHtml(state.profileError)}</p>` : ""}
          <div class="start-actions">
            <button class="button" data-action="save-profile">开始答题</button>
            <button class="button secondary" data-action="restart">返回</button>
          </div>
          <p class="privacy-note">隐私提示：会保存你的名字/网名、行业、选填职位、答题结果和生成报告；如果填写手机号，也会一起保存，用于后续反馈或沟通。不填职位和手机号也能继续测试。请不要填写身份证、详细地址、公司机密等敏感信息。</p>
        </section>
      </div>
    </section>
  `;
}

function renderQuestion() {
  // 对 multiSelect 题型，确保答案已初始化
  const _q = QUESTIONS[state.current];
  if (_q.multiSelect && !state.answers[_q.id]) {
    const _indices = (state.multiSelections[_q.id] || []);
    const _count = _indices.length;
    const _matched = _q.options.find(opt => _count >= opt.minCount && _count <= opt.maxCount);
    if (_matched) {
      state.answers[_q.id] = getOptionId(_q, _q.options.indexOf(_matched));
    }
  }
  const question = QUESTIONS[state.current];
  const selectedOptionId = question.multiSelect
    ? (() => {
        const indices = (state.multiSelections[question.id] || []);
        const count = indices.length;
        const matched = question.options.find(opt => count >= opt.minCount && count <= opt.maxCount);
        return matched ? getOptionId(question, question.options.indexOf(matched)) : undefined;
      })()
    : state.answers[question.id];
  const answeredCount = Object.keys(state.answers).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);
  const orderedOptions = getOrderedOptions(question);
  app.innerHTML = `
    <section class="screen question-screen">
      <header class="site-header">
        <button class="text-button" data-action="restart">AI 协同等级测试</button>
        <div class="header-meta">已完成 ${answeredCount}/${QUESTIONS.length}</div>
      </header>
      <div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:${progress}%"></div></div>
      <div class="question-layout">
        <aside class="question-context">
          <p class="eyebrow">${question.label}</p>
          <div class="question-number">${String(state.current + 1).padStart(2, "0")}</div>
          <p>${question.hint}</p>
        </aside>
        <section class="question-main">
          <h1>${escapeHtml(question.title)}</h1>
          ${
            question.multiSelect
              ? `<div class="scenario-grid">
                  ${question.scenarios.map((scenario, i) => {
                    const checked = (state.multiSelections[question.id] || []).includes(i);
                    return `<label class="scenario-checkbox ${checked ? "selected" : ""}">
                      <input type="checkbox" data-action="toggle-scenario" data-question-id="${question.id}" data-index="${i}" ${checked ? "checked" : ""} />
                      <span>${escapeHtml(scenario)}</span>
                    </label>`;
                  }).join("")}
                </div>
                <p class="scenario-hint">已选 ${((state.multiSelections[question.id] || []).length)} 项</p>
                <div class="options" role="radiogroup" aria-label="${escapeHtml(question.title)}">
                  ${question.options.map((option, index) => {
                    const optId = getOptionId(question, index);
                    const isMatch = (state.answers[question.id] || "").startsWith(optId.split("_")[0] + "_") && Number((state.answers[question.id] || "").split("_")[1]) >= option.minCount && Number((state.answers[question.id] || "").split("_")[1]) <= option.maxCount;
                    // 简化：直接用 index 对应分数档
                    const picked = state.answers[question.id];
                    const isSelected = picked && getOptionIndex(question, picked) === index;
                    return `<button class="option ${isSelected ? "selected" : ""}" data-action="answer" data-option-id="${optId}" role="radio" aria-checked="${isSelected}">
                      <span class="option-key">${String.fromCharCode(65 + index)}</span>
                      <span class="option-copy">
                        <strong>${escapeHtml(option.title)}</strong>
                        <span>${escapeHtml(option.desc)}</span>
                      </span>
                    </button>`;
                  }).join("")}
                </div>`
              : `<div class="options" role="radiogroup" aria-label="${escapeHtml(question.title)}">
                  ${orderedOptions
                    .map(
                      (option, index) => `
                        <button class="option ${selectedOptionId === option.id ? "selected" : ""}" data-action="answer" data-option-id="${option.id}" role="radio" aria-checked="${selectedOptionId === option.id}">
                          <span class="option-key">${String.fromCharCode(65 + index)}</span>
                          <span class="option-copy">
                            <strong>${escapeHtml(option.title)}</strong>
                            <span>${escapeHtml(option.desc)}</span>
                          </span>
                        </button>
                      `
                    )
                    .join("")}
                </div>`
          }
          <div class="question-actions">
            <button class="button secondary" data-action="back" ${state.current === 0 ? "disabled" : ""}>上一步</button>
            <button class="button" data-action="next" ${selectedOptionId === undefined ? "disabled" : ""}>${state.current === QUESTIONS.length - 1 ? "生成报告" : "下一题"}</button>
          </div>
        </section>
      </div>
    </section>
  `;
}

function prepareQuestionOrder() {
  state.optionOrder = {};
  QUESTIONS.forEach((question) => {
    const ids = question.options.map((_, index) => getOptionId(question, index));
    state.optionOrder[question.id] = shuffleStable(ids);
  });
}

function getOrderedOptions(question) {
  const order = state.optionOrder[question.id] || question.options.map((_, index) => getOptionId(question, index));
  return order
    .map((optionId) => {
      const index = getOptionIndex(question, optionId);
      return index >= 0 ? { ...question.options[index], id: optionId, originalIndex: index } : null;
    })
    .filter(Boolean);
}

function getOptionId(question, index) {
  return `${question.id}_${index}`;
}

function getOptionIndex(question, optionId) {
  const prefix = `${question.id}_`;
  if (!String(optionId || "").startsWith(prefix)) return -1;
  const index = Number(String(optionId).slice(prefix.length));
  return Number.isInteger(index) && index >= 0 && index < question.options.length ? index : -1;
}

function shuffleStable(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function renderReport() {
  const diagnosis = state.diagnosis || calculateDiagnosis();
  state.diagnosis = diagnosis;
  const reportMarkdown = state.aiReport || createFallbackReport(diagnosis);
  const actionLabel = state.loadingReport ? "AI 报告生成中" : "下载报告";
  const actionDisabled = state.loadingReport ? "disabled" : "";
  app.innerHTML = `
    <section class="screen report-screen">
      <header class="site-header">
        <div class="wordmark">AI 协同等级测试</div>
        <div class="header-meta">你的测试报告</div>
      </header>
      <section class="report-hero">
        <div>
          <p class="eyebrow">${escapeHtml(state.profile.name || "你的")} 当前等级</p>
          <h1>${diagnosis.level.name}</h1>
          <p>${escapeHtml(getProfileLine())}。${diagnosis.level.summary}</p>
        </div>
        <div class="score-card">
          <span>Score</span>
          <strong>${diagnosis.rawScore}/24</strong>
          <p>${diagnosis.reportTitle}</p>
        </div>
      </section>
      <section class="report-topbar">
        <p class="status">${state.status || "正在准备你的报告。生成完成后可下载成图片保存或转发；如生成失败，也可下载基础报告。"}</p>
        <div class="report-actions">
          <button class="button" data-action="download-report" ${actionDisabled}>${actionLabel}</button>
          <button class="button secondary" data-action="restart">重新测试</button>
        </div>
      </section>
      <section class="report-layout">
        <main class="report-body">
          <div class="report-text" id="reportText">${markdownToHtml(reportMarkdown)}</div>
        </main>
        <aside class="side-stack">
          <section class="panel">
            <h2>四维画像</h2>
            ${Object.entries(DIMENSIONS)
              .map(([key, item]) => {
                const score = diagnosis.dimensionScores[key];
                const anchors = item.anchors || [];
                return `
                  <div class="dimension-row">
                    <div><strong>${item.name}</strong><span>${item.description}</span>
                      <div class="dimension-anchors">
                        ${anchors.map((a, i) => `<span class="${i <= Math.round(score / 2.5) ? "current-anchor" : ""}">${a}</span>`).join("")}
                      </div>
                    </div>
                    <div class="bar" aria-hidden="true"><span class="bar-fill" style="width:${score * 10}%"></span></div>
                    <em>${score}/10</em>
                  </div>
                `;
              })
              .join("")}
          </section>
          <section class="panel next-exercise-panel">
            <h2>本周练习</h2>
            <p>${diagnosis.weeklyExercise || "完成测试后查看你的专属练习建议。"}</p>
          </section>
          <section class="panel">
            <h2>关键证据</h2>
            <ul>${diagnosis.evidence.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </section>
          <section class="panel">
            <h2>下一步方式</h2>
            <ul>${diagnosis.collaborationModes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </section>
        </aside>
      </section>
    </section>
  `;
}

function calculateDiagnosis() {
  const picked = QUESTIONS.map((question) => {
    const optionId = state.answers[question.id];
    const index = getOptionIndex(question, optionId);
    const safeIndex = index >= 0 ? index : 0;
    return { question, index: safeIndex, option: question.options[safeIndex], optionId: getOptionId(question, safeIndex) };
  });
  const rawScore = picked.reduce((sum, item) => sum + item.option.score, 0);
  const dimensionTotals = Object.fromEntries(Object.keys(DIMENSIONS).map((key) => [key, 0]));
  const dimensionMax = Object.fromEntries(Object.keys(DIMENSIONS).map((key) => [key, 0]));

  QUESTIONS.forEach((question) => {
    Object.keys(DIMENSIONS).forEach((key) => {
      dimensionMax[key] += Math.max(...question.options.map((option) => option.dims[key] || 0));
    });
  });
  picked.forEach(({ option }) => {
    Object.keys(DIMENSIONS).forEach((key) => {
      dimensionTotals[key] += option.dims[key] || 0;
    });
  });

  const dimensionScores = Object.fromEntries(
    Object.keys(DIMENSIONS).map((key) => [
      key,
      Math.round((dimensionTotals[key] / Math.max(1, dimensionMax[key])) * 10),
    ])
  );
  const answers = Object.fromEntries(picked.map((item) => [item.question.id, item.index]));
  const level = LEVELS[Math.min(scoreToLevel(rawScore), getLevelCap(answers))];
  const bottleneckKey = Object.entries(dimensionScores).sort((a, b) => a[1] - b[1])[0][0];
  const bottleneck = {
    key: bottleneckKey,
    name: DIMENSIONS[bottleneckKey].name,
    text: getBottleneckText(bottleneckKey),
  };

  return {
    rawScore,
    level,
    dimensionScores,
    evidence: picked.map((item) => item.option.evidence),
    bottleneck,
    nextBreakthrough: getNextBreakthrough(bottleneckKey, level.id),
    weeklyExercise: getWeeklyExercise(bottleneckKey, level.id, dimensionScores),
    collaborationModes: getCollaborationModes(dimensionScores, level.id),
    reportTitle: getReportTitle(level.id),
    selectedAnswers: picked.map((item) => ({
      question: item.question.title,
      questionId: item.question.id,
      optionId: item.optionId,
      answer: item.option.title,
      answerDetail: item.option.desc,
      evidence: item.option.evidence,
    })),
  };
}

function scoreToLevel(score) {
  if (score <= 0) return 0;
  if (score <= 3) return 1;
  if (score <= 6) return 2;
  if (score <= 9) return 3;
  if (score <= 12) return 4;
  if (score <= 15) return 5;
  if (score <= 17) return 6;
  if (score <= 19) return 7;
  if (score <= 21) return 8;
  if (score <= 23) return 9;
  return 10;
}

function getLevelCap(answers) {
  if (answers.frequency === 0) return 0;
  let cap = 10;
  if ((answers.prompt_context || 0) < 1 && (answers.bad_answer || 0) < 1) cap = Math.min(cap, 1);
  if ((answers.prompt_context || 0) < 2 && (answers.bad_answer || 0) < 2) cap = Math.min(cap, 2);
  if ((answers.breadth || 0) < 2) cap = Math.min(cap, 4);
  if ((answers.workflow || 0) < 2 && (answers.assets || 0) < 2) cap = Math.min(cap, 5);
  if ((answers.agent_behavior || 0) < 1) cap = Math.min(cap, 6);
  if (!((answers.workflow || 0) >= 3 || (answers.assets || 0) >= 3)) cap = Math.min(cap, 7);
  if (!((answers.first_reaction || 0) >= 3 && (answers.workflow || 0) >= 3)) cap = Math.min(cap, 8);
  if (!((answers.agent_behavior || 0) >= 3 && (answers.assets || 0) >= 3 && (answers.breadth || 0) >= 3)) {
    cap = Math.min(cap, 9);
  }
  return cap;
}

function getReportTitle(level) {
  if (level <= 1) return "你还在 AI 协作入口";
  if (level <= 3) return "你正在学会把需求说清楚";
  if (level <= 5) return "你已经开始形成固定 AI 工作套路";
  if (level <= 7) return "你正在进入连续任务和工作流阶段";
  if (level <= 9) return "AI 协作正在成为你的方法论";
  return "你已经接近个人 AI 系统形态";
}

function getBottleneckText(key) {
  return {
    control: "当前最值得补的是表达清晰度：用背景、样例、格式和检查标准替代一句话需求。",
    breadth: "当前最值得补的是场景迁移：把 AI 从查资料扩展到写作、表格、方案、图片、代码或生活规划。",
    form: "当前最值得补的是流程协作：从单次问答升级到让 AI 参与连续步骤或工具操作。",
    role: "当前最值得补的是资产沉淀：把好用的一次协作保存成模板、资料包或检查清单。",
  }[key];
}

function getNextBreakthrough(key, level) {
  if (level <= 2) return "先把一句话提问升级成：背景 + 目标 + 输出格式 + 一个参考例子。";
  return {
    control: "挑一个高频任务，写一份固定需求模板，并加上检查标准。",
    breadth: "挑一个低风险的新场景，让 AI 先做一版初稿或计划。",
    form: "把一个至少三步的任务交给能操作文件、网页或代码的 AI 工具试跑。",
    role: "把最近一次成功的 AI 对话整理成可复用模板。",
  }[key];
}

function getWeeklyExercise(bottleneckKey, level, dimensionScores) {
  const exercises = {
    control: [
      "用「背景 + 目标 + 格式 + 样例」格式，重写你常用的 3 个 AI 提问。",
      "找一个最近不满意的 AI 回答，用具体修改要求（不是「重写」）让它改进。",
      "建立一个提示词自查清单：是否有背景？有输出格式？有样例？有验收标准？",
    ],
    breadth: [
      "本周挑一个你从没让 AI 做过的任务（比如做图、做表、写代码），让它做初稿。",
      "列一个「AI 能力清单」，把 8 类场景里你还没用过的标出来，下周挑一个试。",
      "遇到新任务时，先停 10 秒想：这件事能不能让 AI 先做一版？",
    ],
    form: [
      "找一个三步以上的重复任务，让 AI 按「第一步…第二步…第三步…」执行。",
      "试用一个能操作文件或代码的 AI 工具（比如 Cursor、Claude Artifacts）。",
      "把一次完整的 AI 协作过程截图或文字记录，看看哪一步最容易出错。",
    ],
    role: [
      "把最近一次满意的 AI 对话整理成固定提示词，保存在笔记里。",
      "为你的高频任务建立一套「参考资料包」（品牌语气、常用格式、验收标准）。",
      "把一个你做过的 AI 协作流程写成步骤清单，下次直接照着用。",
    ],
  };
  const pool = exercises[bottleneckKey] || exercises.control;
  const week = (level + 1) % pool.length;
  return `本周练习（${DIMENSIONS[bottleneckKey].name}）：${pool[week]}`;
}

function getCollaborationModes(scores, level) {
  const modes = [];
  if (level <= 2 || scores.control < 6) modes.push("需求模板：背景、目标、格式、限制、检查标准一次讲明白");
  if (scores.breadth < 6) modes.push("场景扩展：每周挑一个不熟的任务，让 AI 先做初稿");
  if (scores.form < 6) modes.push("连续任务：把调研、整理、改稿、网页操作或代码任务交给 AI 工具链");
  if (scores.role < 6) modes.push("资产沉淀：把高频任务整理成模板、资料包或固定流程");
  if (modes.length < 2) modes.push("复盘机制：记录这次怎么问、结果哪里好、下次如何复用");
  return modes.slice(0, 3);
}

function createFallbackReport(diagnosis) {
  const name = state.profile.name || "你";
  const profileLine = getProfileLine();
  return `## ${name} 的 AI 协同等级报告

### 当前等级画像
${profileLine}。你的当前等级是 **${diagnosis.level.name}**。${diagnosis.level.summary}

### 四维分析
- 表达清晰度：${diagnosis.dimensionScores.control}/10。${DIMENSIONS.control.description}。
- 场景迁移度：${diagnosis.dimensionScores.breadth}/10。${DIMENSIONS.breadth.description}。
- 流程协作度：${diagnosis.dimensionScores.form}/10。${DIMENSIONS.form.description}。
- 资产沉淀度：${diagnosis.dimensionScores.role}/10。${DIMENSIONS.role.description}。

### 当前瓶颈
${diagnosis.bottleneck.text}

### 本周练习
${diagnosis.weeklyExercise || ""}

### 下一步建议
- ${diagnosis.nextBreakthrough}
- 选一个你每周都会重复的任务，写成固定指令和检查清单。
- 做一次 30 分钟复盘：记录 AI 哪一步帮上忙、哪一步需要你重新约束。

### 推荐协同方式
${diagnosis.collaborationModes.map((mode) => `- ${mode}`).join("\n")}

### 结束语
不要急着追求满级。${name}，下一次真实任务里，只升级一个动作，你的等级就会开始往上走。`;
}

function markdownToHtml(markdown) {
  const lines = escapeHtml(markdown).split("\n");
  const html = [];
  let inList = false;
  lines.forEach((line) => {
    if (line.startsWith("### ")) {
      if (inList) html.push("</ul>");
      inList = false;
      html.push(`<h3>${formatInline(line.slice(4))}</h3>`);
    } else if (line.startsWith("## ")) {
      if (inList) html.push("</ul>");
      inList = false;
      html.push(`<h2>${formatInline(line.slice(3))}</h2>`);
    } else if (line.startsWith("- ")) {
      if (!inList) html.push("<ul>");
      inList = true;
      html.push(`<li>${formatInline(line.slice(2))}</li>`);
    } else if (line.trim()) {
      if (inList) html.push("</ul>");
      inList = false;
      html.push(`<p>${formatInline(line)}</p>`);
    }
  });
  if (inList) html.push("</ul>");
  return html.join("");
}

function formatInline(text) {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem("ai_test_profile") || "{}");
  } catch {
    return {};
  }
}

function saveProfile(profile) {
  state.profile = {
    name: String(profile.name || "").trim(),
    industry: String(profile.industry || "").trim(),
    role: String(profile.role || "").trim(),
    contact: String(profile.contact || "").trim(),
  };
  try {
    localStorage.setItem("ai_test_profile", JSON.stringify(state.profile));
  } catch {
    // The profile remains available in memory for the current session.
  }
}

function getProfileLine() {
  const parts = [];
  if (state.profile.name) parts.push(state.profile.name);
  if (state.profile.industry) parts.push(state.profile.industry);
  if (state.profile.role) parts.push(state.profile.role);
  return parts.length ? parts.join(" · ") : "这位测试者";
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function hashText(text) {
  let hash = 5381;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 33) ^ text.charCodeAt(index);
  }
  return (hash >>> 0).toString(36);
}

function getReportUsageKey() {
  const name = (state.profile.name || "anonymous").trim().toLowerCase();
  return `ai_test_report_usage_${getTodayKey()}_${hashText(name)}`;
}

function getReportUsage() {
  try {
    const used = Number(localStorage.getItem(getReportUsageKey()) || "0");
    return { used, remaining: Math.max(0, DAILY_REPORT_LIMIT - used) };
  } catch {
    return { used: 0, remaining: DAILY_REPORT_LIMIT };
  }
}

function recordReportUsage() {
  try {
    const usage = getReportUsage();
    localStorage.setItem(getReportUsageKey(), String(usage.used + 1));
  } catch {
    // Soft limit only; real public protection belongs in the API proxy layer.
  }
}

async function generateAiReport(options = {}) {
  const requestId = state.reportRequestId + 1;
  state.reportRequestId = requestId;
  const usage = getReportUsage();
  if (REPORT_LIMIT_ENABLED && usage.remaining <= 0) {
    state.status = `${state.profile.name || "这个昵称"} 今天已经生成过 ${DAILY_REPORT_LIMIT} 次 DeepSeek 报告了。明天可以再生成；当前先保留基础报告。`;
    renderReport();
    return;
  }
  state.loadingReport = true;
  state.status = REPORT_LIMIT_ENABLED
    ? `正在请求 DeepSeek 生成报告... 今天剩余 ${usage.remaining} 次`
    : "AI 报告生成中。如果网络较慢，45 秒后会先显示基础报告。";
  renderReport();
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REPORT_REQUEST_TIMEOUT_MS);
  try {
    const diagnosis = state.diagnosis || calculateDiagnosis();
    const payload = buildReportPayload(diagnosis);
    const response = await fetch(WORKER_REPORT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await response.json();
    if (requestId !== state.reportRequestId) return;
    if (!response.ok || data?.ok === false) throw new Error(data?.message || `报告代理请求失败：${response.status}`);
    const content = data?.report_markdown;
    if (!content) throw new Error("DeepSeek 没有返回报告内容");
    state.aiReport = content;
    if (REPORT_LIMIT_ENABLED) recordReportUsage();
    const nextUsage = getReportUsage();
    state.status = REPORT_LIMIT_ENABLED
      ? `已生成 DeepSeek 个性化报告。今天还可生成 ${nextUsage.remaining} 次。`
      : data?.submission_id
      ? `已生成 DeepSeek 个性化报告，并保存测试记录：${data.submission_id}。`
      : "已生成 DeepSeek 个性化报告。测试阶段可继续多次生成。";
  } catch (error) {
    if (requestId !== state.reportRequestId) return;
    state.status =
      error.name === "AbortError"
        ? "AI 报告生成超时，已先生成基础报告，可下载保存；稍后可重新测试。"
        : `${error.message}。已先生成基础报告，可下载保存。`;
  } finally {
    window.clearTimeout(timeoutId);
    if (requestId === state.reportRequestId) {
      state.loadingReport = false;
      renderReport();
    }
  }
}

function buildReportPayload(diagnosis) {
  return {
    profile: state.profile,
    level: diagnosis.level.name,
    raw_score: diagnosis.rawScore,
    dimension_scores: diagnosis.dimensionScores,
    evidence: diagnosis.evidence,
    bottleneck: diagnosis.bottleneck.text,
    next_breakthrough: diagnosis.nextBreakthrough,
    collaboration_modes: diagnosis.collaborationModes,
    selected_answers: diagnosis.selectedAnswers,
    weekly_exercise: diagnosis.weeklyExercise || "",
    source_url: window.location.href,
    app_version: APP_VERSION,
  };
}

async function downloadReport() {
  const diagnosis = state.diagnosis || calculateDiagnosis();
  const markdown = state.aiReport || createFallbackReport(diagnosis);
  const filenameBase = getReportFilenameBase(diagnosis);
  let exportNode = null;
  try {
    if (!window.html2canvas) throw new Error("图片组件未加载");
    exportNode = buildReportExportNode(diagnosis, markdown);
    document.body.appendChild(exportNode);
    await waitForReportLayout(exportNode);
    if (exportNode.innerText.trim().length < 80) throw new Error("报告内容为空");
    const canvas = await window.html2canvas(exportNode, {
      backgroundColor: "#ffffff",
      scale: Math.min(2, window.devicePixelRatio || 2),
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: exportNode.scrollWidth,
      windowHeight: exportNode.scrollHeight,
    });
    if (!canvas || canvas.width < 200 || canvas.height < 200) throw new Error("报告图片为空");
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.98));
    if (!blob || blob.size < 1000) throw new Error("报告图片为空");
    downloadBlob(blob, `${filenameBase}.png`);
    showToast("报告图片已开始下载");
  } catch (error) {
    downloadHtmlReport(diagnosis, markdown, `${filenameBase}.html`);
    showToast("图片生成失败，已下载报告文本");
  } finally {
    exportNode?.remove();
  }
}

function buildReportExportNode(diagnosis, markdown) {
  const node = document.createElement("article");
  node.className = "report-export";
  node.setAttribute("aria-hidden", "true");
  node.innerHTML = `
    <header>
      <p>AI 协同等级测试报告</p>
      <h1>${escapeHtml(diagnosis.level.name)}</h1>
      <div>${escapeHtml(getProfileLine())}</div>
    </header>
    <section class="report-export-score">
      <strong>${diagnosis.rawScore}/24</strong>
      <span>${escapeHtml(diagnosis.reportTitle)}</span>
    </section>
    <section class="report-export-content">${markdownToHtml(markdown)}</section>
  `;
  return node;
}

function waitForReportLayout(node) {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      node.getBoundingClientRect();
      window.setTimeout(resolve, 120);
    });
  });
}

function downloadHtmlReport(diagnosis, markdown, filename) {
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(diagnosis.level.name)} - AI 协同等级测试报告</title>
  <style>
    body{max-width:760px;margin:32px auto;padding:0 18px;color:#171511;background:#fff;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;line-height:1.75}
    h1,h2,h3{font-family:Georgia,"Songti SC","SimSun",serif;font-weight:500}
    h1{font-size:34px} h2{margin-top:28px;font-size:24px} h3{margin-top:20px;color:#9e4b32}
    .meta{color:#6d675e;border-bottom:1px solid #d8ccbb;padding-bottom:16px;margin-bottom:20px}
  </style>
</head>
<body>
  <p class="meta">AI 协同等级测试报告 · ${escapeHtml(getProfileLine())} · ${escapeHtml(diagnosis.rawScore)}/24</p>
  ${markdownToHtml(markdown)}
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  downloadBlob(blob, filename);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getReportFilenameBase(diagnosis) {
  const name = state.profile.name || "AI协同等级测试";
  const level = diagnosis.level.name.replace(/\s+/g, "-");
  return `${sanitizeFilename(name)}-${sanitizeFilename(level)}-报告`;
}

function sanitizeFilename(value) {
  return String(value).replace(/[\\/:*?"<>|]/g, "").slice(0, 48) || "report";
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 1800);
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "start") {
    state.screen = "profile";
    state.profileError = "";
    state.profileDraft = { name: "", industry: "", role: "", contact: "" };
    render();
  }
  if (action === "save-profile") {
    const name = document.querySelector("#profileName")?.value || "";
    const industry = document.querySelector("#profileIndustry")?.value || "";
    const role = document.querySelector("#profileRole")?.value || "";
    const contact = document.querySelector("#profileContact")?.value || "";
    state.profileDraft = { name, industry, role, contact };
    if (!name.trim()) {
      state.profileError = "请先填写名字或网名，报告需要用它来称呼你。";
      renderProfile();
      return;
    }
    if (!industry.trim()) {
      state.profileError = "请填写行业，这会帮助报告给出更贴近你的建议。";
      renderProfile();
      return;
    }
    saveProfile({ name, industry, role, contact });
    state.profileDraft = { name: "", industry: "", role: "", contact: "" };
    state.profileError = "";
    state.screen = "question";
    state.current = 0;
    state.answers = {};
    prepareQuestionOrder();
    render();
  }
  if (action === "answer") {
    const question = QUESTIONS[state.current];
    if (question.multiSelect) {
      // multiSelect: 先收集勾选的场景 indices，再找到对应的 option
      const indices = state.multiSelections[question.id] || [];
      const count = indices.length;
      const matched = question.options.find(opt => count >= opt.minCount && count <= opt.maxCount);
      if (matched) {
        const optIndex = question.options.indexOf(matched);
        state.answers[question.id] = getOptionId(question, optIndex);
      } else {
        state.answers[question.id] = getOptionId(question, 0);
      }
    } else {
      state.answers[question.id] = target.dataset.optionId;
    }
    renderQuestion();
  }
  if (action === "toggle-scenario") {
    const questionId = target.dataset.questionId;
    const index = Number(target.dataset.index);
    if (!state.multiSelections[questionId]) state.multiSelections[questionId] = [];
    const arr = state.multiSelections[questionId];
    const pos = arr.indexOf(index);
    if (pos >= 0) arr.splice(pos, 1); else arr.push(index);
    // 实时更新答案
    const question = QUESTIONS.find(q => q.id === questionId);
    const count = arr.length;
    const matched = question.options.find(opt => count >= opt.minCount && count <= opt.maxCount);
    if (matched) {
      const optIndex = question.options.indexOf(matched);
      state.answers[questionId] = getOptionId(question, optIndex);
    } else {
      // 不应该发生（总有一个 option 的 minCount=0 能匹配），但保险起见删掉答案
      delete state.answers[questionId];
    }
    renderQuestion();
  }
  if (action === "next") {
    if (state.current < QUESTIONS.length - 1) {
      state.current += 1;
      renderQuestion();
    } else {
      state.diagnosis = calculateDiagnosis();
      state.screen = "report";
      renderReport();
      generateAiReport({ auto: true });
    }
  }
  if (action === "back" && state.current > 0) {
    state.current -= 1;
    renderQuestion();
  }
  if (action === "restart") {
    state.reportRequestId += 1;
    state.current = 0;
    state.answers = {};
    state.optionOrder = {};
    state.diagnosis = null;
    state.aiReport = "";
    state.status = "";
    state.screen = "start";
    render();
  }
  if (action === "download-report") downloadReport();
  if (action === "ai-report") generateAiReport();
});

render();
