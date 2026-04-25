# Zed go-zero API DSL 高亮插件 — 需求

确认后冻结，执行阶段不可修改。如需变更必须回到设计阶段重新确认。

## 核心目标
为 Zed 开发一个语言扩展，让 go-zero `.api` DSL 文件获得稳定的语法识别与高亮显示。目标用户是使用 Zed 编写 go-zero API 服务定义的 Go 开发者。

## 功能边界
必须包含：
- Zed extension 基础清单：`extension.toml`。
- 语言配置：识别 `.api` 后缀，语言名为 `Go Zero API`，支持 `//` 行注释。
- Tree-sitter grammar：解析 go-zero API DSL 的主结构。
- 高亮查询：覆盖声明、关键字、注解、HTTP 方法、路由、类型、字段、字符串、Go struct tag 和注释。
- 辅助查询：至少提供括号匹配、基础缩进和 outline。
- 示例与验证材料：包含代表性 `.api` 样例和 Tree-sitter 解析测试。
- 本地验证说明：支持用 Zed `Install Dev Extension` 安装当前仓库进行人工检查。

## 非目标
本阶段不做：
- LSP、补全、跳转定义、悬浮文档、诊断或 formatter。
- 调用 `goctl` 生成代码或校验业务规则。
- 发布到 Zed extensions registry。
- 为 Neovim、Helix 等其他编辑器单独适配。
- 主题、图标主题或非语言扩展能力。

## 技术约束
- 遵循 Zed language extension 结构：`extension.toml`、`languages/<language>/config.toml`、Tree-sitter grammar、query 文件。
- 扩展 ID 和名称不能包含 `zed` 或 `extension`；建议 ID 为 `go-zero-api-dsl`。
- 使用 Tree-sitter grammar 提供语法树，Zed query 文件提供高亮、括号、缩进与 outline。
- grammar 可先放在当前仓库内，以 `file://` 方式供本地开发引用；正式发布前再固定远程仓库 revision。
- go-zero DSL 语法以官方 API DSL Reference 为准，重点覆盖 `syntax`、`info`、`import`、`type`、`service`、`@server`、`@handler`、HTTP route 和 `returns`。

## 质量要求
- Tree-sitter parser 能解析典型 go-zero `.api` 文件，无明显错误节点。
- 高亮覆盖核心 DSL 结构，避免只做关键字正则级高亮。
- 查询文件使用 Zed 支持的标准 capture 名称，保证主题兼容。
- 测试优先：先用 grammar corpus 固定语法行为，再接入 Zed 扩展。
- 文件保持职责清晰；grammar 与 query 文件分离，不引入无必要的 Rust/WASM 逻辑。
