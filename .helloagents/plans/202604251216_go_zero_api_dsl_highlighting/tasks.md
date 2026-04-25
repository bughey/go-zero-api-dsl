# Zed go-zero API DSL 高亮插件 — 任务分解

## 任务列表
- [√] 任务1：创建 Zed 扩展基础清单（涉及文件：`extension.toml`；完成标准：包含 `id`、`name`、`version`、`schema_version`、`authors`、`description`、`repository`，并注册 `go_zero_api` grammar；验证方式：人工检查 manifest 字段与 Zed 文档一致）
- [√] 任务2：创建语言元数据配置（涉及文件：`languages/go-zero-api/config.toml`；完成标准：语言名为 `Go Zero API`，grammar 为 `go_zero_api`，识别 `.api`，行注释为 `// `；验证方式：Zed dev extension 打开 `.api` 文件能选择该语言）
- [√] 任务3：建立 Tree-sitter grammar 项目骨架（涉及文件：`tree-sitter-go-zero-api/package.json`、`tree-sitter-go-zero-api/grammar.js`；完成标准：能运行 `tree-sitter generate`；验证方式：`cd tree-sitter-go-zero-api && tree-sitter generate`）
- [√] 任务4：实现 DSL 顶层声明语法（涉及文件：`tree-sitter-go-zero-api/grammar.js`、`tree-sitter-go-zero-api/test/corpus/declarations.txt`；完成标准：解析 `syntax`、`info`、单行 import、多行 import；验证方式：`tree-sitter test`）
- [√] 任务5：实现 type 与字段语法（涉及文件：`tree-sitter-go-zero-api/grammar.js`、`tree-sitter-go-zero-api/test/corpus/types.txt`；完成标准：解析 `type` block、单个类型、字段类型、Go struct tag、注释；验证方式：`tree-sitter test`）
- [√] 任务6：实现 service、注解与 route 语法（涉及文件：`tree-sitter-go-zero-api/grammar.js`、`tree-sitter-go-zero-api/test/corpus/services.txt`；完成标准：解析多个 service block、`@server`、`@handler`、HTTP 方法、路径参数、request、returns；验证方式：`tree-sitter test`）
- [√] 任务7：补充示例 `.api` 文件（涉及文件：`examples/user.api`；完成标准：样例覆盖公开路由、JWT 路由、请求响应类型、path/form/json/header tag；验证方式：`tree-sitter parse examples/user.api`）
- [√] 任务8：编写高亮查询（涉及文件：`languages/go-zero-api/highlights.scm`；完成标准：核心 DSL 结构映射到标准 capture，包括 keyword、attribute、function、type、property、string、comment、operator、punctuation、tag；验证方式：Zed dev extension 人工查看高亮）
- [√] 任务9：编写括号、缩进和 outline 查询（涉及文件：`languages/go-zero-api/brackets.scm`、`languages/go-zero-api/indents.scm`、`languages/go-zero-api/outline.scm`；完成标准：括号匹配可用，service/type block 缩进合理，outline 展示 service、type、handler；验证方式：Zed dev extension 人工验证）
- [√] 任务10：编写项目说明（涉及文件：`README.md`；完成标准：说明功能、安装 dev extension、测试命令、已知限制和后续计划；验证方式：按 README 能完成本地安装与测试）
- [√] 任务11：执行完整验证并修复问题（涉及文件：全项目；完成标准：`tree-sitter generate`、`tree-sitter test`、`tree-sitter parse examples/user.api` 通过，Zed 可加载扩展；验证方式：记录命令结果与人工检查结论）

## 进度
实现已完成；Zed 内人工安装验证需用户在本机执行 `zed: install dev extension`。
