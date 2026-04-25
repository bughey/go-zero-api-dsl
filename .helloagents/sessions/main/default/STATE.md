# 恢复快照

## 主线目标
开发 Zed 插件支持 go-zero `.api` DSL 高亮显示。

## 正在做什么
`~build` 实现已完成，等待用户在 Zed 内执行 dev extension 人工检查或继续 `~verify`。

## 关键上下文
- 已新增 Zed language extension：`extension.toml`、`languages/go-zero-api/config.toml`、`languages/go-zero-api/*.scm`。
- 已新增 Tree-sitter grammar：`tree-sitter-go-zero-api/grammar.js`、`tree-sitter-go-zero-api/tree-sitter.json`、生成的 `src/` parser 文件和 corpus 测试。
- 已新增示例与文档：`examples/user.api`、`README.md`、`LICENSE`。
- `extension.toml` 当前使用本机仓库 `file://` 路径、`rev = "HEAD"` 与 `path = "tree-sitter-go-zero-api"`；Zed 通过 Git 解析 grammar，安装 dev extension 前必须先提交 grammar 文件；发布或移动仓库前需要改成最终远程仓库 URL 和固定 commit SHA，或新的本机绝对路径。
- 验证已通过：`extension.toml` TOML 解析校验、`tree-sitter generate`、`tree-sitter test`、`tree-sitter parse ../examples/user.api`、四个 query 文件的 CLI 校验。

## 下一步
先提交当前 grammar/extension 变更，再在 Zed 中运行 `zed: install dev extension` 并选择当前仓库，打开 `examples/user.api` 做人工视觉检查；若需要继续收尾，执行 `~verify`。

## 阻塞项
Zed 内人工检查无法在当前 CLI 中代替执行。

## 方案
.helloagents/plans/202604251216_go_zero_api_dsl_highlighting/

## 已标记技能
hello-verify
