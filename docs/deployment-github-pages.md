# GitHub Pages 部署指南

## 当前站点状态

本项目是零依赖静态站点，部署到 GitHub Pages 时只需要仓库根目录包含：

```text
index.html
styles.css
app.js
```

当前页面引用是相对路径：

```html
<link rel="stylesheet" href="./styles.css" />
<script src="./app.js"></script>
```

因此可以直接部署到 GitHub Pages 的仓库根目录。

## 本地检查结果

- `node --check app.js`：通过。
- `index.html`、`styles.css`、`app.js`：适合静态托管。
- 本机有 `git`：`/usr/bin/git`。
- 当前项目目录还不是 git 仓库。
- 未检测到 `gh` 命令；不要自动安装。

## 用户需要先做什么

用户还没有 GitHub 账号，需要先完成注册：

1. 打开 GitHub 官网：`https://github.com/`
2. 点击 `Sign up`。
3. 填写邮箱、密码、用户名。
4. 完成邮箱验证码验证。
5. 登录 GitHub。

注意：

- 不要把 GitHub 密码、邮箱验证码、token 发给 agent。
- 如果需要浏览器协助注册，必须先由总控向用户确认。

## 推荐仓库设置

注册完成后建议：

- GitHub 用户名：`jedi0310`
- 仓库名：`ai-collaboration-level-test`
- 可见性：Public
- 初始化 README：可以不勾选，因为本地已经有 README。
- 部署来源：GitHub Pages -> `Deploy from a branch`
- 分支：`main`
- 目录：`/ (root)`

部署完成后，访问地址通常是：

```text
https://jedi0310.github.io/ai-collaboration-level-test/
```

## 当前推荐路径

因为本机没有检测到 `gh` 命令，且用户刚完成 GitHub 注册，当前最稳路径是：

1. 用户先在 GitHub 网页创建一个空的 Public 仓库。
2. 项目线程在用户确认后，在本项目目录初始化 git。
3. 项目线程提交当前静态站点文件。
4. 项目线程添加远程仓库地址。
5. 项目线程执行 `git push -u origin main`。
6. 用户或项目线程按确认权限配置 GitHub Pages。

不推荐“纯网页上传”作为主路径，因为后续每次更新都要重新上传文件，容易漏掉 `docs/` 或项目记录。纯网页上传可以作为不用命令行的备选方案。

## 当前执行状态

2026-06-18 已在本项目目录完成本地 git 初始化和首次提交：

```text
commit: dc5a0f8 Deploy AI collaboration level test
remote: https://github.com/jedi0310/ai-collaboration-level-test.git
```

执行 `git push -u origin main` 时失败：

```text
fatal: could not read Username for 'https://github.com': Device not configured
```

含义：本机当前没有可供命令行使用的 GitHub HTTPS 登录凭据。项目线程不会索要或处理 GitHub 密码、验证码、token。下一步需要用户完成 GitHub 命令行认证，或改用网页上传。

可选处理方式：

1. 用户在系统 Git 凭据弹窗、浏览器或终端中完成 GitHub 认证后，再由项目线程重试 `git push -u origin main`。
2. 用户安装并登录 GitHub CLI 后再推送；当前项目线程不会自动安装 `gh`。
3. 用户改用 GitHub 网页上传文件。

## 方案 B：命令行认证状态

用户已选择继续配置命令行 push，不走网页手动上传。

当前检查结果：

- 本地 git 工作区干净。
- remote 仍是 HTTPS：`https://github.com/jedi0310/ai-collaboration-level-test.git`。
- 最近提交：
  - `902b28d Record GitHub Pages deployment blocker`
  - `dc5a0f8 Deploy AI collaboration level test`
- SSH 到 GitHub 的联网检查结果：

```text
git@github.com: Permission denied (publickey).
```

含义：能连到 GitHub，但当前没有被 GitHub 接受的 SSH key。

本机 `/Users/jedizhang/.ssh` 下没有检测到 `.pub` 公钥文件。当前不能直接改 SSH remote 并 push。

更新：用户已生成 SSH key 并把公钥添加到 GitHub。项目线程验证 SSH 成功：

```text
Hi jedi0310! You've successfully authenticated, but GitHub does not provide shell access.
```

后续 remote 将切换为：

```text
git@github.com:jedi0310/ai-collaboration-level-test.git
```

### 推荐下一步：生成新的 SSH key

需要用户授权后，项目线程才可以生成新的 ed25519 SSH key。建议命令：

```bash
ssh-keygen -t ed25519 -C "jedi0310@gmail.com" -f /Users/jedizhang/.ssh/id_ed25519
```

注意：

- 这会在 `/Users/jedizhang/.ssh` 写入新的私钥和公钥。
- 项目线程可以读取并展示公钥内容，用于让用户复制到 GitHub。
- 项目线程绝不读取、展示或记录私钥。

用户把公钥添加到 GitHub 的步骤：

1. 打开 GitHub。
2. 进入右上角头像 -> `Settings`。
3. 进入 `SSH and GPG keys`。
4. 点击 `New SSH key`。
5. Title 可填：`MacBook AI测试网站部署`。
6. Key type 选 `Authentication Key`。
7. 粘贴 `.pub` 公钥内容。
8. 保存。

添加后，项目线程可再次检查：

```bash
ssh -T git@github.com
```

如果成功，再经用户确认执行：

```bash
git remote set-url origin git@github.com:jedi0310/ai-collaboration-level-test.git
git push -u origin main
```

### HTTPS / PAT 备选方案

也可以继续使用 HTTPS remote，但 GitHub 现在不支持用账号密码直接推送，通常需要 Personal Access Token 或系统凭据管理器。

不推荐把 PAT 发给项目线程。若使用 PAT，应由用户自己在系统凭据弹窗、Git Credential Manager 或终端认证提示中输入，项目线程不接收、不记录、不保存 token。

## SSH key 使用文档

SSH key 的使用、私钥/公钥区别、GitHub 添加公钥步骤、以后如何更新网站，见：

```text
docs/github-ssh-key-guide.md
```

## 用户现在需要确认

继续命令行部署前，请用户确认：

1. 仓库名是否使用 `ai-collaboration-level-test`。
2. 仓库是否设置为 Public。
3. 是否允许在本项目目录执行 `git init`。
4. 是否允许把当前项目文件提交到本地 git。
5. 是否允许添加远程仓库：

```text
https://github.com/jedi0310/ai-collaboration-level-test.git
```

6. 是否允许执行 `git push -u origin main`。
7. Git 提交用的姓名和邮箱是什么。
8. 如果推送时 GitHub 要求登录，是否由用户在系统弹窗、浏览器或终端里自行完成认证。

不要把 GitHub 密码、验证码、token 发给 agent。

## 用户网页创建空仓库步骤

1. 登录 `https://github.com/`。
2. 右上角点击 `+`。
3. 选择 `New repository`。
4. Repository name 填：`ai-collaboration-level-test`。
5. 选择 `Public`。
6. 不要勾选 `Add a README file`。
7. 不要添加 `.gitignore`。
8. 不要选择 License。
9. 点击 `Create repository`。

创建完成后，把仓库页面停在那里即可。仓库地址应为：

```text
https://github.com/jedi0310/ai-collaboration-level-test
```

## 用户确认后项目线程将执行的命令

确认后，项目线程预计执行：

```bash
git init
git branch -M main
git add index.html styles.css app.js README.md AGENTS.md tasks.md decisions.md docs
git commit -m "Deploy AI collaboration level test"
git remote add origin https://github.com/jedi0310/ai-collaboration-level-test.git
git push -u origin main
```

如果 git 用户名和邮箱未配置，还需要先执行用户确认过的：

```bash
git config user.name "<用户确认的提交姓名>"
git config user.email "<用户确认的提交邮箱>"
```

这些配置可以只写入本项目仓库，不必写全局配置。

## 用户手动部署步骤

如果不用 `gh` 命令行，适合小白的方式是：

1. 在 GitHub 创建新仓库 `ai-collaboration-level-test`。
2. 在仓库页面选择上传文件。
3. 上传项目根目录中的这些文件和目录：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   - `docs/`
4. 提交上传。
5. 打开仓库 `Settings`。
6. 进入 `Pages`。
7. Source 选择 `Deploy from a branch`。
8. Branch 选择 `main`，Folder 选择 `/ (root)`。
9. 保存后等待 1 到 3 分钟。
10. 打开 GitHub Pages 给出的访问链接。

## 命令行部署需要用户确认的事项

如果后续希望由项目线程继续协助命令行部署，需要总控先向用户确认：

- GitHub 用户名。
- 仓库名。
- 仓库是否公开。
- 是否允许在本项目目录初始化 git。
- 是否允许打开浏览器进行 GitHub 登录。
- 是否允许使用 `gh auth login`，或改用 GitHub 网页手动创建仓库。
- 是否允许推送到远程仓库。

当前不能自动执行：

- 注册 GitHub。
- 登录 GitHub。
- 创建 GitHub 仓库。
- 推送远程仓库。
- 安装 `gh`。
- 处理密码、验证码、token 或任何密钥。

## DeepSeek 和公开传播提醒

当前纯前端模式不会把 DeepSeek API Key 写进代码。用户如果在页面里填 Key，Key 只保存在当前浏览器本地。

但如果公开传播时想让访问者无需填写 Key，就不能把站长自己的 Key 放进 GitHub Pages 前端代码。需要增加 Cloudflare Worker 或 Vercel Function 代理，并在代理层做真实限流。
