# 恢复快照

## 主线目标
开发 Zed 插件支持 go-zero `.api` DSL 高亮显示。

## 正在做什么
已完成 `~plan`：生成高亮插件的方案包，尚未进入实现。

## 关键上下文
- 推荐方案：纯 Zed Language Extension MVP，使用 Tree-sitter grammar + Zed query 文件完成高亮、括号、缩进和 outline。
- 本阶段不做 LSP、补全、诊断、goctl 集成或发布到 Zed extensions registry。
- 验证主路径：test-first。
- 官方参考：Zed extension/language extension 文档；go-zero API DSL Reference。

## 下一步
用户明确启动执行后，按 `.helloagents/plans/202604251216_go_zero_api_dsl_highlighting/tasks.md` 从 `extension.toml`、`languages/go-zero-api/config.toml` 和 `tree-sitter-go-zero-api/grammar.js` 开始实现。

## 阻塞项
等待用户确认是否进入 `~build` 执行。

## 方案
.helloagents/plans/202604251216_go_zero_api_dsl_highlighting/

## 已标记技能
无
