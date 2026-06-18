# AI测试网站任务池

## 当前重点

- [x] 明确该目录用途：AI 协同等级测试网站。
- [x] 决定创建具体 Web 项目，优先静态部署到 GitHub Pages。
- [x] 定稿 8 道测试题、选项、分值和等级门槛。
- [x] 定稿 DeepSeek 个性化报告 prompt 和输出结构。
- [x] 补录总控误接管期间的功能变更和项目线程承接规则。
- [ ] 本地打开静态 MVP 做人工体验验收。
- [ ] 验证公开测试版 Worker 报告链路：画像、8 题、Worker 生成、D1 存档、图片报告下载。
- [ ] 在 GitHub 仓库 Settings -> Pages 开启 GitHub Pages。
- [ ] 在 Cloudflare Worker 后台配置 D1 binding 和 secrets，并部署 Worker。

## 待办池

- [x] 明确测试网站主题、目标用户和功能。
- [x] 明确技术栈并创建前端项目：零依赖静态站点。
- [x] 明确是否需要部署：优先 GitHub Pages。
- [x] 实现本地评分和四维诊断。
- [x] 接入 DeepSeek API Key 输入模式。
- [x] 公开测试版改为 Cloudflare Worker 代理 DeepSeek，访问者不再填写 API Key。
- [x] 增加用户名字/网名、行业、职业填写，用于个性化报告。
- [x] 调整画像字段规则：名字/网名和行业必填，职位和手机号选填。
- [x] 增加同一浏览器同一昵称每日 3 次 DeepSeek 报告软限制。
- [x] 测试阶段临时关闭前端每日 3 次软限制，方便反复跑链路。
- [ ] 正式发布前重新决定限流策略。
- [x] 新增 Cloudflare Worker 代理模板和 D1 schema。
- [ ] 在 Cloudflare 后台完成 Worker、D1 binding、Secrets 和线上联调。
- [ ] 正式发布前评估后台页面和真实限流策略。
- [x] 完成 GitHub Pages 本地部署适配检查。
- [x] 新增 GitHub Pages 小白部署指南。
- [x] 增加 DeepSeek API 失败时的模板报告 fallback。
- [x] 优化小白友好的题目文案和手机 / 桌面双端视觉。
- [x] 重构题目为行为题、提示词示例题、Agent 识别题，减少模糊自评。
- [x] 改为 Anthropic 式克制产品风格，移除幼稚化图形和重叠关卡图。
- [x] 将最后一步改为“生成报告”，有 Key 时自动调用 DeepSeek，无 Key 时回退基础报告。
- [x] 报告页“下载报告”改为 html2canvas 生成 PNG 图片，失败时下载 HTML 报告文本。
- [x] 每次测试开始时为每题生成稳定乱序选项，评分按选项自身分值计算。
- [x] 新增公开测试版隐私提示：保存画像、答题结果和报告，提醒不要填写敏感信息。
- [x] D1 schema 和 Worker 存档支持选填手机号字段，并提供线上迁移 SQL。

## 进行中

- [ ] GitHub Pages + Cloudflare Worker 公开测试版部署联调。

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
