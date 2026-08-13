### 2024.3 GQL

#### Numbers
- INF, INFINITY, NAN are now valid numeric literals
- added support for `_` separator
- 007 is now valid decimal integer

#### Strings
- Added `''` and `""` escapes for `'` and `"` respectively
- Changed number of digits for \U escape character from 8 to 6

#### Grammar Nodes
Renamed nodes:
- `double_literal` -> `decimal_literal`
- `symbolic_name` -> `identifier`
- `schema_name` -> `identifier`

Removed nodes:
- `exponent_decimal_real`
- `regular_decimal_real`
- `unescaped_symbolic_name`
- `escaped_symbolic_name`
- `reserved_word` (replaced with `non_reserved_word`, inlined)

Patterns:
- left_arrow_head accepts > only
- right_arrow_head accepts > only
- dash accepts - only
