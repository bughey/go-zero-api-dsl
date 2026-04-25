# Go Zero API DSL for Zed

Zed language extension for go-zero `.api` DSL files. It provides syntax parsing, highlighting, bracket matching, basic indentation, and outline entries for API definitions.

## Features

- Recognizes `.api` files as `Go Zero API`.
- Highlights go-zero DSL keywords: `syntax`, `info`, `import`, `type`, `service`, and `returns`.
- Highlights `@server`, `@handler`, HTTP methods, route paths, path parameters, request/response types, fields, strings, comments, and Go struct tags.
- Provides bracket matching for `()`, `{}`, and quoted strings.
- Provides indentation hints for metadata, imports, type blocks, service blocks, and server annotations.
- Provides outline entries for services, type definitions, and handlers.

## Local installation in Zed

1. Ensure Rust is installed with `rustup`; Zed requires this for dev extensions that build grammars.
2. Open Zed.
3. Run `zed: install dev extension`.
4. Select this repository directory.
5. Open `examples/user.api` or another go-zero `.api` file.

The current `extension.toml` uses a local `file://` repository path, a pinned Git commit SHA, and `path = "tree-sitter-go-zero-api"` for development on this machine. Before publishing or moving the repository, update `[grammars.go_zero_api]` to the final grammar repository URL and pinned commit SHA, or to a new local absolute `file://` path.

Because Zed resolves grammars through Git, the grammar files must be committed before installing the dev extension. If Zed reports `failed to compile grammar 'go_zero_api'`, commit the current changes and reinstall the dev extension.

## Format on save

This extension does not bundle a formatter. To format `.api` files on save, configure Zed to call `goctl api format --stdin` as an external formatter.

Add this to your Zed user settings or project `.zed/settings.json`:

```json
{
  "languages": {
    "Go Zero API": {
      "format_on_save": "on",
      "formatter": {
        "external": {
          "command": "goctl",
          "arguments": ["api", "format", "--stdin"]
        }
      }
    }
  }
}
```

If Zed cannot find `goctl`, use an absolute path:

```json
{
  "languages": {
    "Go Zero API": {
      "format_on_save": "on",
      "formatter": {
        "external": {
          "command": "/path/to/goctl",
          "arguments": ["api", "format", "--stdin"]
        }
      }
    }
  }
}
```

`goctl api format --stdin` reads the buffer content from standard input and writes the formatted result to standard output, which matches Zed's external formatter contract.

## Development

Generate the parser:

```sh
cd tree-sitter-go-zero-api
npx tree-sitter-cli generate
```

Run grammar tests:

```sh
cd tree-sitter-go-zero-api
npx tree-sitter-cli test
```

Parse the example file:

```sh
cd tree-sitter-go-zero-api
npx tree-sitter-cli parse ../examples/user.api
```

Validate Zed query files with the Tree-sitter CLI:

```sh
cd tree-sitter-go-zero-api
npx tree-sitter-cli query ../languages/go-zero-api/highlights.scm ../examples/user.api
npx tree-sitter-cli query ../languages/go-zero-api/brackets.scm ../examples/user.api
npx tree-sitter-cli query ../languages/go-zero-api/indents.scm ../examples/user.api
npx tree-sitter-cli query ../languages/go-zero-api/outline.scm ../examples/user.api
```

The parse/query commands may warn if the global Tree-sitter CLI config has no parser directories. The commands still validate the local grammar when run from `tree-sitter-go-zero-api`.

## Scope

This extension intentionally does not include LSP support, completion, diagnostics, or a bundled formatter. Save-time formatting can be configured through Zed settings and `goctl api format --stdin`.

## License

MIT
