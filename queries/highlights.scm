(comment) @comment

(string_literal) @string
(escaped_char) @string.escape
(number_literal) @number
(boolean_literal) @boolean
"null" @constant

[
 "[" "]"
 "{" "}"
 "(" ")"
] @punctuation.bracket

[
 "all"
 "asc"
 "ascending"
 "by"
 "create"
 "delete"
 "desc"
 "descending"
 "detach"
 "exists"
 "limit"
 "match"
 "merge"
 "on"
 "optional"
 "order"
 "remove"
 "return"
 "set"
 "skip"
 "where"
 "with"
 "union"
 "unwind"
 "and"
 "as"
 "contains"
 "distinct"
 "ends"
 "in"
 "is"
 "not"
 "or"
 "starts"
 "xor"
 "constraint"
 "unique"
 "case"
 "when"
 "then"
 "else"
 "end"
 "mandatory"
 "scalar"
 "of"
 "add"
 "drop"
] @keyword

(node_pattern) @constant
(relationship_pattern) @constant
(variable) @type
