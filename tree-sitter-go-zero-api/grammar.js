const HTTP_METHODS = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'head',
]

module.exports = grammar({
  name: 'go_zero_api',

  extras: $ => [
    /\s/,
    $.comment,
  ],

  word: $ => $.identifier,

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.syntax_declaration,
      $.info_block,
      $.import_declaration,
      $.type_declaration,
      $.service_block,
    ),

    syntax_declaration: $ => seq(
      'syntax',
      '=',
      field('version', $.string),
    ),

    info_block: $ => seq(
      'info',
      '(',
      repeat($.key_value_property),
      ')',
    ),

    key_value_property: $ => seq(
      field('key', $.identifier),
      ':',
      field('value', choice($.string, $.literal_value)),
    ),

    import_declaration: $ => seq(
      'import',
      choice(
        field('path', $.string),
        $.import_block,
      ),
    ),

    import_block: $ => seq(
      '(',
      repeat(field('path', $.string)),
      ')',
    ),

    type_declaration: $ => seq(
      'type',
      choice(
        $.type_group,
        $.type_spec,
      ),
    ),

    type_group: $ => seq(
      '(',
      repeat($.type_spec),
      ')',
    ),

    type_spec: $ => seq(
      field('name', alias($.identifier, $.type_identifier)),
      '{',
      repeat($.field_declaration),
      '}',
    ),

    field_declaration: $ => seq(
      field('name', $.identifier),
      field('type', $.field_type),
      optional(field('tag', $.struct_tag)),
    ),

    service_block: $ => seq(
      'service',
      field('name', $.service_identifier),
      '{',
      repeat(choice(
        $.server_annotation,
        $.handler_annotation,
        $.route_declaration,
      )),
      '}',
    ),

    server_annotation: $ => seq(
      '@server',
      '(',
      repeat($.key_value_property),
      ')',
    ),

    handler_annotation: $ => seq(
      '@handler',
      field('name', $.identifier),
    ),

    route_declaration: $ => seq(
      field('method', $.http_method),
      field('path', $.route_path),
      optional(field('request', $.type_reference)),
      optional(field('response', $.returns_clause)),
    ),

    type_reference: $ => seq(
      '(',
      optional(alias($.identifier, $.type_identifier)),
      ')',
    ),

    returns_clause: $ => seq(
      'returns',
      $.type_reference,
    ),

    route_path: $ => seq(
      '/',
      repeat(seq(
        choice($.path_parameter, $.path_segment),
        optional('/'),
      )),
    ),

    http_method: _ => choice(...HTTP_METHODS),

    identifier: _ => /[A-Za-z_][A-Za-z0-9_]*/,

    service_identifier: _ => /[A-Za-z_][A-Za-z0-9_-]*/,

    field_type: _ => token(seq(
      optional(choice('[]', '*')),
      /[A-Za-z_][A-Za-z0-9_.]*/,
    )),

    path_segment: _ => token.immediate(/[A-Za-z0-9._~%!$&'()*+,;=@-]+/),

    path_parameter: _ => token.immediate(seq(
      ':',
      /[A-Za-z_][A-Za-z0-9_]*/,
    )),

    literal_value: _ => token(/[^\s)"`]+/),

    string: $ => seq(
      '"',
      repeat(choice(
        token.immediate(/[^"\\\n]+/),
        $.escape_sequence,
      )),
      '"',
    ),

    escape_sequence: _ => token.immediate(seq(
      '\\',
      /["\\nrt]/,
    )),

    struct_tag: _ => token(seq(
      '`',
      repeat(/[^`\n]/),
      '`',
    )),

    comment: _ => token(seq('//', /.*/)),
  },
})
