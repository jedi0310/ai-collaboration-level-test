# AI测试网站决策记录

## 2026-06-15 暂作为占位测试网站目录保留

### 决策

当前 `AI测试网站` 暂作为占位项目保留，不主动创建框架。

### 影响

后续必须等用户明确需求后再实施。

## 2026-06-18 转为 AI 协同等级测试网站

### 决策

本项目转为 AI 协同等级测试网站。第一版基于“AI 使用水平 10 个等级”模型，通过约 8 道题判断用户所处等级，并用 DeepSeek 生成个性化报告。

### 技术方向

- 前端优先使用静态站点，方便部署到 GitHub Pages。
- 不做登录、数据库或传统后端。
- 前端负责评分、四维诊断、行为证据和等级初判。
- DeepSeek 负责根据结构化诊断结果生成个性化报告。
- 纯静态模式下不内置 DeepSeek API Key，避免泄露。
- 如需公开版免填 Key，需要增加 Cloudflare Worker 或 Vercel Function 作为轻量 API 代理。

### 影响

后续开发应先定稿题目、评分规则、报告 prompt 和 API Key 安全方案，再创建前端项目。

## 2026-06-18 第一版采用零依赖静态 MVP

### 决策

第一版不安装依赖，不初始化 Vite / React，直接使用 `index.html`、`styles.css`、`app.js` 实现可本地打开的静态单页测试网站。

### 范围

- 题库、四维分值、Lv.0-Lv.10 门槛判断全部在前端实现。
- 报告页默认生成基础模板报告。
- 用户可在报告页手动填写自己的 DeepSeek API Key 生成个性化报告。
- DeepSeek 请求失败时保留基础模板报告并显示失败提示。
- 代码和文档不写入任何真实 DeepSeek API Key。

### 影响

该版本可以直接放到 GitHub Pages。若后续要做公开传播版且不希望访问者填写 Key，需要新增 Cloudflare Worker 或 Vercel Function 代理，并把 API Key 放在代理环境变量里。

## 2026-06-18 视觉和题目二次重构

### 决策

测试网站不再使用图形化关卡路线图，改为更接近 Anthropic 官网的克制产品风格：温暖米白背景、黑色正文、低饱和强调色、信息分栏和报告式卡片。

题目从主观自评改为更可判定的结构：

- 过去 30 天行为题。
- 具体提示词示例题。
- AI 回答失败后的下一句选择。
- Agent / 自动执行型 AI 识别题。
- 可复用材料和工作流证据题。

### 影响

后续调整题库时，应优先使用可观察行为、具体示例和识别题，减少“我好像 A/B/C 都像”的选项设计。

## 2026-06-18 报告生成流程调整

### 决策

最后一题按钮使用“生成报告”。用户完成 8 题后，前端先完成本地诊断；如果当前浏览器已有 DeepSeek API Key，则自动请求 DeepSeek 生成个性化报告；如果没有 Key，则显示基础模板报告并提示用户填写 Key 后生成模型版报告。

### 影响

DeepSeek Key 仍不写入代码或文档。当前静态站点只把 Key 保存在用户浏览器本地，后续公开传播版仍建议使用 Cloudflare Worker 或 Vercel Function 代理。

## 2026-06-18 增加用户画像和报告生成限次

### 决策

测试开始前增加用户名字/网名、行业和职业字段，用于让 DeepSeek 生成更完整、更像写给个人的报告。

DeepSeek 报告生成增加前端软限制：同一浏览器、同一昵称每天最多生成 3 次。测试答题本身不限制，限制只作用于模型报告生成。

### 影响

- 生成报告时会把用户画像和结构化诊断结果一起传给 DeepSeek。
- 当前限次基于浏览器 localStorage，只能防误点和普通重复刷，不能防清缓存、换浏览器、换昵称等绕过。
- 如果公开版使用站长自己的 DeepSeek API Key，仍需在 Cloudflare Worker 或 Vercel Function 代理层增加真实限流。

## 2026-06-18 项目线程补录总控误接管期间变更

### 背景

用户指出总控线程多次绕过 `AI测试网站` 项目线程，直接修改本项目文件，导致项目线程记录断档。根目录规则已经修订：本项目后续功能实现、项目文档维护和任务记录默认由 `AI测试网站` 项目线程执行；总控只做派单、只读抽查、验收和汇总。

### 总控为何越权

误接管原因是总控把用户在总控线程中的连续反馈当作“小改”和“继续推进”直接落盘，没有遵守已有项目线程的写入边界，也没有先把需求派发给项目线程执行。这违反了当前根目录 `AGENTS.md`、`THREADS.md` 和 `PROJECT_AGENTS.md` 中关于“总控不得直接修改已有项目功能代码和项目记录”的规则。

### 已发生并已补录的项目变更

- 第 7 题去掉“小白听不懂的 AI材料”，改为“你有没有把好用的 AI 问法保存下来，下次继续用？”，并用固定提示词、参考案例、写作口吻、检查清单、做事步骤解释。
- 第 8 题改为 PPT 协作场景：“如果现在要做一个 PPT，你会怎么让 AI 跟你一起完成？”。
- 最后一题按钮改为“生成报告”。
- 新增用户画像步骤：名字/网名、行业、职业。开始测试会先进入资料填写页。
- 报告页和基础报告会使用用户称呼，并把用户画像传入 DeepSeek payload。
- DeepSeek prompt 增加要求：自然使用用户昵称，并结合行业/职业给建议。
- 增加前端软限制：同一浏览器、同一昵称每天最多生成 3 次 DeepSeek 报告；答题测试本身不限。
- README、tasks、decisions 和设计计划已同步说明纯前端限次边界：只能防误点和普通重复刷；公开版若使用站长 Key，仍需 Worker/Vercel 代理层做真实限流。

### 当前文件状态

- `app.js`：包含开始页、用户画像页、8 题答题页、报告页、本地评分、基础报告 fallback、DeepSeek 生成、用户画像 payload、本地 Key 保存和每日 3 次软限制。
- `styles.css`：保持 Anthropic 式克制产品风格，支持手机端和桌面端。
- `README.md`、`tasks.md`、`decisions.md`、`docs/plans/2026-06-18-ai-collaboration-level-test-design.md`：已记录当前产品状态、限次边界和后续部署方向。

### 后续承接

后续本项目功能修改由 `AI测试网站` 项目线程执行。总控只做派单、只读抽查、验收和汇总。如总控再次误改本项目文件，项目线程应先读取现有文件，不覆盖当前状态，再补录变更并继续维护项目上下文。

## 2026-06-18 GitHub Pages 部署准备状态

### 决策

当前站点保持零依赖静态部署方式，优先部署到 GitHub Pages 仓库根目录。`index.html` 使用 `./styles.css` 和 `./app.js` 相对路径，适合 GitHub Pages 静态托管。

### 本地状态

- `node --check app.js` 已通过。
- 当前目录还不是 git 仓库。
- 本机有 `git`：`/usr/bin/git`。
- 未检测到 `gh` 命令。
- 用户尚未注册 GitHub，因此不做登录、建仓库、推送或浏览器操作。

### 影响

后续部署需要用户先注册 GitHub，并确认 GitHub 用户名、仓库名、仓库可见性，以及是否允许初始化本地 git、打开浏览器登录、使用命令行推送。

项目已新增 `docs/deployment-github-pages.md`，记录小白手动部署步骤和命令行部署前需要确认的事项。

## 2026-06-18 GitHub 注册后部署路径

### 决策

用户已完成 GitHub 注册，用户名为 `jedi0310`。由于本机未检测到 `gh` 命令，当前推荐路径是：用户先在 GitHub 网页创建空 Public 仓库 `ai-collaboration-level-test`，项目线程在用户确认后用原生 `git` 初始化本地仓库、提交文件、添加远程并推送。

### 待用户确认

- 仓库名是否使用 `ai-collaboration-level-test`。
- 仓库是否为 Public。
- 是否允许在本项目目录执行 `git init`。
- 是否允许提交当前项目文件。
- 是否允许添加远程 `https://github.com/jedi0310/ai-collaboration-level-test.git`。
- 是否允许执行 `git push -u origin main`。
- Git 提交使用的姓名和邮箱。
- 若推送触发 GitHub 登录，用户需要自行在系统弹窗、浏览器或终端中完成认证；项目线程不接收密码、验证码或 token。

### 影响

暂不使用 `gh`，不安装任何依赖，不创建远程仓库，不推送，直到用户确认上述事项。纯网页上传可作为备选，但后续更新维护成本更高。

## 2026-06-18 GitHub push 认证阻塞

### 已执行

用户确认后，项目线程已在本项目目录执行：

- `git init`
- `git branch -M main`
- `git config user.name "jedi0310"`
- `git config user.email "jedi0310@gmail.com"`
- `git add index.html styles.css app.js README.md AGENTS.md tasks.md decisions.md docs`
- `git commit -m "Deploy AI collaboration level test"`
- `git remote add origin https://github.com/jedi0310/ai-collaboration-level-test.git`
- `git push -u origin main`

本地提交已成功：

```text
dc5a0f8 Deploy AI collaboration level test
```

### 阻塞

`git push -u origin main` 失败：

```text
fatal: could not read Username for 'https://github.com': Device not configured
```

原因是本机命令行没有可用的 GitHub HTTPS 认证凭据。项目线程不索要、不记录 GitHub 密码、验证码或 token。

### 下一步

需要用户完成 GitHub 认证后再重试 push，或改用网页上传。可选方案：

- 用户在系统弹窗、浏览器或终端完成 GitHub 登录后，项目线程重试 `git push -u origin main`。
- 用户安装并登录 GitHub CLI 后再推送；项目线程不自动安装。
- 用户改用 GitHub 网页上传项目文件。

## 2026-06-18 用户选择命令行认证方案 B

### 决策

用户明确选择继续配置命令行 push，不走网页手动上传。项目线程已检查当前 git 和 SSH 状态。

### 当前状态

- 本地 git 工作区干净。
- remote 仍是 HTTPS：`https://github.com/jedi0310/ai-collaboration-level-test.git`。
- 最近提交：
  - `902b28d Record GitHub Pages deployment blocker`
  - `dc5a0f8 Deploy AI collaboration level test`
- SSH 到 GitHub 的结果是：

```text
git@github.com: Permission denied (publickey).
```

- `/Users/jedizhang/.ssh` 下未检测到 `.pub` 公钥文件。

### 下一步

推荐用户授权生成新的 ed25519 SSH key，并由用户把公钥添加到 GitHub。项目线程不得未授权生成 SSH key，不得读取私钥，不得索要或记录 GitHub 密码、验证码、token。

如果用户完成公钥添加，项目线程可在确认后执行：

```bash
git remote set-url origin git@github.com:jedi0310/ai-collaboration-level-test.git
git push -u origin main
```

HTTPS/PAT 可作为备选，但 PAT 应由用户自行输入到系统凭据弹窗或凭据管理器，不能发给项目线程。

## 2026-06-18 SSH 认证成功

### 决策

用户已生成 SSH key，并把公钥添加到 GitHub。项目线程执行 `ssh -T git@github.com`，GitHub 返回：

```text
Hi jedi0310! You've successfully authenticated, but GitHub does not provide shell access.
```

这表示 SSH 认证成功。

### 下一步

本项目 remote 可从 HTTPS 切换为 SSH：

```text
git@github.com:jedi0310/ai-collaboration-level-test.git
```

随后使用 `git push -u origin main` 推送当前本地提交。

### 安全记录

项目线程不读取、不输出、不记录私钥 `/Users/jedizhang/.ssh/id_ed25519`。项目已新增 `docs/github-ssh-key-guide.md`，说明 SSH key、公钥添加、后续更新和故障排查。

## 2026-06-18 SSH push 被远端已有提交拒绝

### 已执行

SSH 认证成功后，项目线程已执行：

```bash
git remote set-url origin git@github.com:jedi0310/ai-collaboration-level-test.git
git push -u origin main
```

### 结果

push 失败：

```text
! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'github.com:jedi0310/ai-collaboration-level-test.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally.
```

### 判断

远端 `main` 分支已有提交，通常是 GitHub 网页创建仓库时勾选了 README、license 或其他初始化内容。本地不应强推覆盖远端历史。

### 下一步

需要用户确认是否允许项目线程先拉取远端内容并合并，再推送。本项目推荐合并远端内容，不建议强推覆盖。

预计命令：

```bash
git pull origin main --allow-unrelated-histories --no-rebase
git push -u origin main
```

如果合并出现冲突，项目线程应停止并回报，不得擅自覆盖。
