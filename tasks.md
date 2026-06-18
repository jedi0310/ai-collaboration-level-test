# AI测试网站任务池

## 当前重点

- [x] 明确该目录用途：AI 协同等级测试网站。
- [x] 决定创建具体 Web 项目，优先静态部署到 GitHub Pages。
- [x] 定稿 8 道测试题、选项、分值和等级门槛。
- [x] 定稿 DeepSeek 个性化报告 prompt 和输出结构。
- [x] 补录总控误接管期间的功能变更和项目线程承接规则。
- [ ] 本地打开静态 MVP 做人工体验验收。
- [ ] 验证用户画像填写、报告称呼和测试阶段不限次生成报告链路。
- [ ] 在 GitHub 仓库 Settings -> Pages 开启 GitHub Pages。

## 待办池

- [x] 明确测试网站主题、目标用户和功能。
- [x] 明确技术栈并创建前端项目：零依赖静态站点。
- [x] 明确是否需要部署：优先 GitHub Pages。
- [x] 实现本地评分和四维诊断。
- [x] 接入 DeepSeek API Key 输入模式。
- [x] 增加用户名字/网名、行业、职业填写，用于个性化报告。
- [x] 增加同一浏览器同一昵称每日 3 次 DeepSeek 报告软限制。
- [x] 测试阶段临时关闭前端每日 3 次软限制，方便反复跑链路。
- [ ] 正式发布前重新决定限流策略。
- [ ] 评估并实现 Cloudflare Worker 或 Vercel Function 作为公开版 DeepSeek API 代理。
- [x] 完成 GitHub Pages 本地部署适配检查。
- [x] 新增 GitHub Pages 小白部署指南。
- [x] 增加 DeepSeek API 失败时的模板报告 fallback。
- [x] 优化小白友好的题目文案和手机 / 桌面双端视觉。
- [x] 重构题目为行为题、提示词示例题、Agent 识别题，减少模糊自评。
- [x] 改为 Anthropic 式克制产品风格，移除幼稚化图形和重叠关卡图。
- [x] 将最后一步改为“生成报告”，有 Key 时自动调用 DeepSeek，无 Key 时回退基础报告。

## 进行中

- [ ] GitHub Pages 部署：等待在 GitHub 网页开启 Pages。

## 已完成

- [x] 补齐项目级四件套。
- [x] 新增产品和技术设计计划。
- [x] 新增静态 MVP：`index.html`、`styles.css`、`app.js`。
- [x] 按参考站方向改为黑白手册式视觉，并降低题目专业术语门槛。
- [x] 二次改版为 Anthropic 风格：专业、克制、低饱和、信息分栏。
- [x] 在项目线程内补录总控越权修改期间的题目、画像、报告、限次和文档状态。
- [x] 检查静态文件适配 GitHub Pages，记录 git/gh 状态。
- [x] 用户已注册 GitHub：`jedi0310`；已记录推荐部署路径和待确认事项。
- [x] 已检查 SSH GitHub 认证：当前为 `Permission denied (publickey)`，本机未发现 `.pub` 公钥。
- [x] 用户已添加 SSH 公钥到 GitHub，SSH 认证验证成功。
- [x] 新增 GitHub SSH key 使用说明。
- [x] 已将 remote 切换为 SSH；push 因远端已有提交被拒绝，未强推。
- [x] 已初始化本地 git、创建首次提交、添加 GitHub remote；push 卡在 GitHub 认证。
- [x] 用户已确认允许合并远端已有提交，不强推。
- [x] 已解决远端合并冲突，使用 SSH 成功推送到 `jedi0310/ai-collaboration-level-test`。

## 暂停 / 以后再说

- [ ] 是否归档为空项目。
- [ ] 是否合并到其他应用项目。

## 每次任务结束后的维护动作

- 一旦确定用途，更新 `README.md` 和 `decisions.md`。
