# AI测试网站

## 一句话说明

这是一个用于开发 AI 协同等级测试网站的项目目录。当前目标是基于“AI 使用水平 10 个等级”模型，做一个可部署的静态测试网站。

## 当前状态

第一版静态 MVP 已实现：

- 通过 8 道题判断用户当前 AI 协同能力等级。
- 保留 Lv.0 到 Lv.10 的等级表达。
- 前端负责评分、维度诊断和行为证据提取。
- 基础模板报告可离线生成。
- 测试前会收集用户名字/网名和行业，并可选填写职位与手机号，用于生成更个性化的报告和后续反馈。
- 公开测试版由 Cloudflare Worker 代理 DeepSeek，访问者不需要填写 API Key。
- 测试阶段已临时关闭 DeepSeek 报告生成次数限制，方便多次跑完整链路。
- 生成报告会保存用户画像、选填手机号、答题结果和报告到 Cloudflare D1，用于改进测试体验。
- DeepSeek 请求失败时会保留基础模板报告。
- 第 8 题完成后按钮为“生成报告”：前端会先显示基础报告，再请求 Worker 生成 DeepSeek 个性化报告。
- 报告页提供“下载 PDF”，使用前端 html2pdf.js 生成文件；失败时自动下载 HTML 报告文本。
- 网站可直接本地打开，手机端和桌面端都可使用，后续优先部署到 GitHub Pages。
- 题目已改为更客观的行为题、示例题和 Agent 识别题，降低“小白不知道怎么选”的问题。
- 界面改为参考 Anthropic 官网的克制产品风格，去掉幼稚化图形和关卡点位。
- 不做登录；公开测试版会通过 Cloudflare D1 保存测试结果和报告，作为站长改进测试的后台记录。

## 本地使用

直接用浏览器打开 `index.html` 即可，不需要安装依赖或启动构建工具。

```text
index.html
styles.css
app.js
```

公开测试版不让访问者填写 DeepSeek API Key。前端会请求 Cloudflare Worker：

```text
https://ai-test-deepseek-proxy.jedi0310.workers.dev/api/report
```

DeepSeek API Key 只能配置在 Cloudflare Worker Secret / 环境变量里，项目代码和文档不会内置任何真实 API Key。

测试阶段暂不限制 DeepSeek 报告生成次数。正式公开传播前，需要再决定限流策略。

公开传播版使用站长自己的 DeepSeek Key 时，不能把 Key 写进 GitHub Pages 前端代码，需要在 Cloudflare Worker 通过环境变量保存 Key。当前 MVP 使用 Cloudflare D1 存 submissions 和 reports，后续可在代理层增加真实限流、统计和后台页面。

## 后续用途

可以用于：

- AI 页面实验
- 测试网站原型
- 部署验证
- 临时 Web demo

当前重点是：

- AI 协同能力等级测试
- DeepSeek 个性化报告生成
- 用户画像个性化报告
- GitHub Pages 静态部署

## 维护入口

- `README.md`：当前说明。
- `AGENTS.md`：agent 工作规则。
- `tasks.md`：任务池。
- `decisions.md`：决策记录。
- `docs/plans/2026-06-18-ai-collaboration-level-test-design.md`：当前产品和技术设计计划。
- `docs/deployment-github-pages.md`：GitHub 注册后的小白部署步骤和命令行部署前确认项。
- `docs/deepseek-cloudflare-worker.md`：Cloudflare Worker、D1、Secrets 和后台接口部署说明。
- `cloudflare-worker/`：Worker 代理模板、D1 schema 和 wrangler 示例。

## 工作原则

保持零依赖静态 MVP 优先。不主动安装依赖，不迁入其他项目，不把 DeepSeek API Key 写入前端代码。
