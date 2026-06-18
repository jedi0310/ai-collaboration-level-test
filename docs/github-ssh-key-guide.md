# GitHub SSH Key 使用说明

## SSH key 是什么

SSH key 是让本机和 GitHub 安全通信的一对密钥。它通常用于命令行 `git push`，避免每次输入 GitHub 密码或 token。

一对 SSH key 包含：

- 私钥：只放在自己的电脑上，绝不能发给任何人。
- 公钥：可以添加到 GitHub，用来证明这台电脑有权限连接账号。

## 本机当前 key 路径

本机当前用于 GitHub 的 key 路径：

```text
私钥：/Users/jedizhang/.ssh/id_ed25519
公钥：/Users/jedizhang/.ssh/id_ed25519.pub
```

不要打开、复制、发送私钥内容。

可以复制公钥内容添加到 GitHub。公钥文件名以 `.pub` 结尾。

## 如何把公钥添加到 GitHub

1. 登录 GitHub。
2. 点击右上角头像。
3. 进入 `Settings`。
4. 打开 `SSH and GPG keys`。
5. 点击 `New SSH key`。
6. Title 可以写：`MacBook AI测试网站部署`。
7. Key type 选择 `Authentication Key`。
8. 粘贴 `.pub` 公钥内容。
9. 保存。

## 如何验证 SSH 是否可用

执行：

```bash
ssh -T git@github.com
```

如果看到类似下面的提示，说明认证成功：

```text
Hi jedi0310! You've successfully authenticated, but GitHub does not provide shell access.
```

这条信息里的 “does not provide shell access” 是正常的，不是错误。

## 以后如何更新网站

每次修改网站后，在本项目目录执行：

```bash
git status --short
git add index.html styles.css app.js README.md AGENTS.md tasks.md decisions.md docs
git commit -m "Update AI test website"
git push
```

如果只改了部分文件，也可以只 `git add` 相关文件。

## 如果换电脑怎么办

推荐在新电脑上重新生成一对 SSH key，然后把新公钥添加到 GitHub。

不要通过聊天、邮件、网盘或明文文档传输旧电脑的私钥。

如果确实要迁移旧私钥，需要用户自己确认安全方式，并确保私钥权限正确。本项目 agent 不读取、不复制、不保存私钥。

## 如果 push 失败怎么排查

先检查远程地址：

```bash
git remote -v
```

如果 remote 是 SSH，应该类似：

```text
git@github.com:jedi0310/ai-collaboration-level-test.git
```

再检查 SSH：

```bash
ssh -T git@github.com
```

常见情况：

- `Permission denied (publickey).`：GitHub 没有接受当前 SSH key。检查公钥是否添加到 GitHub，或是否用错 key。
- `Repository not found.`：仓库地址错了，或当前 GitHub 账号没有仓库权限。
- 网络超时或 DNS 错误：检查网络，或稍后重试。

不要把 GitHub 密码、验证码、Personal Access Token 或 SSH 私钥发给任何 agent。
