[
  "syntax"
  "info"
  "import"
  "type"
  "service"
  "returns"
] @keyword

[
  "get"
  "post"
  "put"
  "patch"
  "delete"
  "head"
] @keyword

[
  "@server"
  "@handler"
] @attribute

(comment) @comment

(string) @string
(escape_sequence) @string.escape
(struct_tag) @string.special

(type_identifier) @type
(field_type) @type.builtin

(service_identifier) @function

(route_path) @string.special
(path_segment) @string.special
(path_parameter) @variable.special

(key_value_property
  key: (identifier) @property)

(field_declaration
  name: (identifier) @property)

(handler_annotation
  name: (identifier) @function)

(literal_value) @constant

[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket

[
  ":"
  "/"
] @punctuation.delimiter

"=" @operator
