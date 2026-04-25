# Zed go-zero API DSL 高亮插件 — 实施规划

## 目标与范围
本次规划交付一个可执行方案，用于实现 Zed 语言扩展，让 go-zero `.api` 文件在 Zed 中具备语法高亮、括号匹配、基础缩进和 outline。

验收目标：
- Zed 能将 `.api` 文件识别为 `Go Zero API`。
- go-zero API DSL 的主结构被 Tree-sitter 正确解析。
- `syntax`、`import`、`type`、`service`、`@server`、`@handler`、HTTP 方法、路由、类型名、字段、tag、字符串和注释有合理高亮。
- 可通过 Tree-sitter corpus 测试和 Zed dev extension 人工验证。

## 架构与实现策略
采用“纯语言扩展 MVP”方案：
1. 当前仓库作为 Zed 扩展仓库。
2. 在仓库内维护 `tree-sitter-go-zero-api` grammar，先支持本地开发。
3. `extension.toml` 注册语言扩展和 grammar。
4. `languages/go-zero-api/config.toml` 定义语言元数据。
5. `languages/go-zero-api/*.scm` 提供 Zed 查询能力。

关键取舍：
- 暂不引入 Rust/WASM 扩展逻辑，因为高亮、括号、缩进和 outline 可由 language extension + Tree-sitter query 完成。
- 暂不接入 `goctl` 或 LSP，避免把高亮 MVP 扩大成完整 IDE 插件。
- grammar 先覆盖官方 DSL 主路径，再通过样例扩展边界语法。

## 完成定义
功能完成时必须为真：
- `extension.toml` 字段完整，扩展 ID 使用 `go-zero-api-dsl`。
- `.api` 文件能匹配到 `Go Zero API` 语言。
- Tree-sitter grammar 能解析以下结构：
  - `syntax = "v1"`
  - `info (...)`
  - 单行与多行 `import`
  - `type (...)` 和单个 type declaration
  - struct 字段与 Go struct tag
  - 多个 `service` block
  - `@server (...)`
  - `@handler Name`
  - HTTP route declaration：`get/post/put/patch/delete/head /path (Req) returns (Resp)`
  - 无 response body route：`delete /path (Req)`
- `highlights.scm` 使用 Zed 主题兼容 capture，核心语法元素可区分。
- `brackets.scm`、`indents.scm`、`outline.scm` 可被 Zed 加载。
- README 说明本地安装、测试和已知边界。

验证主路径：`test-first`。

tester 重点验证：
- Tree-sitter corpus 测试覆盖核心 DSL 样例。
- `tree-sitter parse` 对示例 `.api` 文件无异常。
- Zed dev extension 能加载扩展并识别 `.api` 文件。

reviewer 重点验证：
- Zed manifest 与 language config 是否符合官方结构。
- grammar 节点是否便于 query 维护。
- 高亮 capture 是否使用 Zed 支持的标准名称。

## 文件结构
规划文件：
- `.helloagents/plans/202604251216_go_zero_api_dsl_highlighting/requirements.md`
- `.helloagents/plans/202604251216_go_zero_api_dsl_highlighting/plan.md`
- `.helloagents/plans/202604251216_go_zero_api_dsl_highlighting/tasks.md`
- `.helloagents/plans/202604251216_go_zero_api_dsl_highlighting/contract.json`

实现阶段预计新增：
- `extension.toml`
- `README.md`
- `languages/go-zero-api/config.toml`
- `languages/go-zero-api/highlights.scm`
- `languages/go-zero-api/brackets.scm`
- `languages/go-zero-api/indents.scm`
- `languages/go-zero-api/outline.scm`
- `tree-sitter-go-zero-api/grammar.js`
- `tree-sitter-go-zero-api/package.json`
- `tree-sitter-go-zero-api/src/grammar.json`（生成）
- `tree-sitter-go-zero-api/src/parser.c`（生成）
- `tree-sitter-go-zero-api/test/corpus/*.txt`
- `examples/user.api`

## UI / 设计约束
不涉及用户界面开发。Zed 内部的语法配色由用户主题决定，本项目只提供标准语义 capture，不定义主题样式。

## 风险与验证
主要风险：
- `.api` 扩展名可能与其他 API 描述文件冲突。缓解：语言名明确为 `Go Zero API`，后续可增加首行 `syntax = "v1"` 辅助识别策略。
- go-zero DSL 边界语法覆盖不完整。缓解：先以官方参考样例建 corpus，再补充真实项目样例。
- Zed 加载本地 grammar 的路径和发布形态不同。缓解：MVP 先使用本地 dev extension 验证，发布前再切换为固定远程 grammar revision。

验证方式：
- `tree-sitter generate`
- `tree-sitter test`
- `tree-sitter parse examples/user.api`
- Zed `Install Dev Extension` 人工验证：文件识别、高亮、括号、outline。

回退点：
- 如果 grammar 设计过于复杂，保留主结构解析，延后处理极端 tag、复杂注释或错误恢复。
- 如果 outline 查询不稳定，先交付高亮、括号与缩进，outline 标为后续增强。

## 决策记录
- [2026-04-25] 选择“纯语言扩展 MVP”，因为当前目标是高亮显示，Zed language extension + Tree-sitter 已覆盖核心需求，不需要一开始引入 LSP 或 goctl 集成。
- [2026-04-25] 当前仓库作为扩展仓库，grammar 先内置在仓库中，降低初始开发与验证成本。
- [2026-04-25] 验证主路径设为 `test-first`，因为 grammar 与 query 的稳定性需要通过 corpus 和 parse 结果先固定。
