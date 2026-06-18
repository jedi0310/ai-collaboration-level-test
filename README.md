# AI测试网站

## 一句话说明

这是一个用于开发 AI 协同等级测试网站的项目目录。当前目标是基于“AI 使用水平 10 个等级”模型，做一个可部署的静态测试网站。

## 当前状态

第一版静态 MVP 已实现：

- 通过 8 道题判断用户当前 AI 协同能力等级。
- 保留 Lv.0 到 Lv.10 的等级表达。
- 前端负责评分、维度诊断和行为证据提取。
- 基础模板报告可离线生成。
- 测试前会收集用户名字/网名、行业和职业，用于生成更个性化的报告。
- 用户可手动填写自己的 DeepSeek API Key 生成个性化报告。
- 同一浏览器、同一昵称下，DeepSeek 报告每天最多生成 3 次，避免误点和普通重复刷。
- DeepSeek 请求失败时会保留基础模板报告。
- 第 8 题完成后按钮为“生成报告”：如果本浏览器已保存 DeepSeek Key，会自动请求模型报告；否则先显示基础报告。
- 网站可直接本地打开，手机端和桌面端都可使用，后续优先部署到 GitHub Pages。
- 题目已改为更客观的行为题、示例题和 Agent 识别题，降低“小白不知道怎么选”的问题。
- 界面改为参考 Anthropic 官网的克制产品风格，去掉幼稚化图形和关卡点位。
- 不做传统后端、不做登录、不保存用户数据。

## 本地使用

直接用浏览器打开 `index.html` 即可，不需要安装依赖或启动构建工具。

```text
index.html
styles.css
app.js
```

如果要测试 DeepSeek 个性化报告，请在报告页手动填写自己的 API Key。Key 会保存在当前浏览器本地，项目代码和文档不会内置任何真实 API Key。

当前每日 3 次限制是纯前端软限制，只能防误点和普通重复生成。公开传播版如果使用站长自己的 DeepSeek Key，需要在 Cloudflare Worker 或 Vercel Function 这类代理层做真正限流。

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

## 工作原则

保持零依赖静态 MVP 优先。不主动安装依赖，不迁入其他项目，不把 DeepSeek API Key 写入前端代码。
