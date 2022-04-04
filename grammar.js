'use strict';
// opencypher tests
// https://github.com/opencypher/openCypher/blob/c816756d50df9cde73cae573ef871f2d7e76c70a/tools/grammar/src/test/resources/cypher.txt
module.exports = grammar({
    name: 'cypher',
    extras: function ($) { return [$.comment, $._whitespace_char]; },
    conflicts: function () { return []; },
    inline: function ($) { return [
        $.namespace,
    ]; },
    rules: {
        cypher: function ($) { return seq($.statement, optional(';')); },
        statement: function ($) { return $.query; },
        query: function ($) { return choice($.regular_query, $.standalone_call); },
        regular_query: function ($) { return seq($.single_query, repeat($.union)); },
        union: function ($) { return seq(word('union'), optional(word('all')), $.single_query); },
        single_query: function ($) { return choice($.single_part_query, $.multi_part_query); },
        single_part_query: function ($) { return choice(seq(repeat($.reading_clause), $["return"]), seq(repeat($.reading_clause), repeat1($.updating_clause), optional($["return"]))); },
        multi_part_query: function ($) { return seq(repeat1(seq(repeat($.reading_clause), repeat($.updating_clause), $["with"])), $.single_part_query); },
        updating_clause: function ($) { return choice($.create, $.merge, $["delete"], $.set, $.remove); },
        reading_clause: function ($) { return choice($.match, $.unwind, $.in_query_call); },
        match: function ($) { return seq(optional(word('optional')), word('match'), $.pattern, optional($.where)); },
        unwind: function ($) { return seq(word('unwind'), $.expression, word('as'), $.variable); },
        merge: function ($) { return seq(word('merge'), $.pattern_part, repeat($.merge_action)); },
        merge_action: function ($) { return seq(word('on'), choice(word('create'), word('match')), $.set); },
        create: function ($) { return seq(word('create'), $.pattern); },
        set: function ($) { return seq(word('set'), $.set_item, repeat(seq(',', $.set_item))); },
        set_item: function ($) { return choice(seq($.property_expression, '=', $.expression), seq($.variable, choice('+=', '='), $.expression), seq($.variable, $.node_labels)); },
        "delete": function ($) { return seq(optional(word('detach')), word('delete'), $.expression, repeat(seq(',', $.expression))); },
        remove: function ($) { return seq(word('remove'), $.remove_item, repeat(seq(',', $.remove_item))); },
        remove_item: function ($) { return choice(seq($.variable, $.node_labels), $.property_expression); },
        in_query_call: function ($) { return seq(word('call'), $.explicit_procedure_invocation, optional(seq(word('yield'), $.yield_items))); },
        standalone_call: function ($) { return seq(word('call'), choice($.explicit_procedure_invocation, $.implicit_procedure_invocation), optional(seq(word('yield'), $.yield_items))); },
        yield_items: function ($) { return seq(choice('*', seq($.yield_item, repeat(seq(',', $.yield_item)))), optional($.where)); },
        yield_item: function ($) { return seq(optional(seq($.procedure_result_field, word('as'))), $.variable); },
        "with": function ($) { return seq(word('with'), $.projection_body, optional($.where)); },
        "return": function ($) { return seq(word('return'), $.projection_body); },
        projection_body: function ($) { return seq(optional(word('distinct')), $.projection_items, optional($.order), optional($.skip), optional($.limit)); },
        projection_items: function ($) { return choice(seq('*', repeat(seq(',', $.projection_item))), seq($.projection_item, repeat(seq(',', $.projection_item)))); },
        projection_item: function ($) { return choice($.expression, seq($.expression, word('as'), $.variable)); },
        order: function ($) { return seq(word('order'), word('by'), $.sort_item, repeat(seq(',', $.sort_item))); },
        skip: function ($) { return seq(word('skip'), $.expression); },
        limit: function ($) { return seq(word('limit'), $.expression); },
        sort_item: function ($) { return seq($.expression, optional(choice(word('asc'), word('ascending'), word('desc'), word('descending')))); },
        where: function ($) { return seq(word('where'), $.expression); },
        pattern: function ($) { return seq($.pattern_part, repeat(seq(',', $.pattern_part))); },
        pattern_part: function ($) { return choice(seq($.variable, '=', $.anonymous_pattern_part), $.anonymous_pattern_part); },
        anonymous_pattern_part: function ($) { return $.pattern_element; },
        pattern_element: function ($) { return choice(seq($.node_pattern, repeat($.pattern_element_chain)), seq('(', $.pattern_element, ')')); },
        node_pattern: function ($) { return seq('(', optional($.variable), optional($.node_labels), optional($.properties), ')'); },
        pattern_element_chain: function ($) { return seq($.relationship_pattern, $.node_pattern); },
        relationship_pattern: function ($) { return seq(optional($.left_arrow_head), $.dash, optional($.relationship_detail), $.dash, optional($.right_arrow_head)); },
        relationship_detail: function ($) { return seq('[', optional($.variable), optional($.relationship_types), optional($.range_literal), optional($.properties), ']'); },
        // TODO: ensure that the precedence here does not break grammar.
        properties: function ($) { return prec(1, choice($.map_literal, $.parameter)); },
        relationship_types: function ($) { return seq(':', $.rel_type_name, repeat(seq('|', optional(':'), $.rel_type_name))); },
        node_labels: function ($) { return prec.right(repeat1($.node_label)); },
        node_label: function ($) { return seq(':', $.label_name); },
        range_literal: function ($) { return seq('*', optional($.integer_literal), optional(seq('..', optional($.integer_literal)))); },
        label_name: function ($) { return $.schema_name; },
        rel_type_name: function ($) { return $.schema_name; },
        expression: function ($) { return choice($.or_expression, $.xor_expression, $.and_expression, $.not_expression, $.comparison_expression, $.addition_expression, $.multiplicative_expression, $.exponential_expression, $.unary_expression, $.string_list_null_operator_expression, $.property_or_labels_expression, $.atom); },
        or_expression: function ($) { return expression(0, seq($.expression, word('or'), $.expression)); },
        xor_expression: function ($) { return expression(1, seq($.expression, word('xor'), $.expression)); },
        and_expression: function ($) { return expression(2, seq($.expression, word('and'), $.expression)); },
        not_expression: function ($) { return expression(3, seq(word('not'), $.expression)); },
        comparison_expression: function ($) { return expression(4, seq($.expression, choice('=', '<>', '<', '>', '<=', '>='), $.expression)); },
        addition_expression: function ($) { return expression(5, seq($.expression, choice('-', '+'), $.expression)); },
        multiplicative_expression: function ($) { return expression(6, seq($.expression, choice('*', '/', '%'), $.expression)); },
        exponential_expression: function ($) { return expression(7, seq($.expression, '^', $.expression)); },
        unary_expression: function ($) { return expression(8, seq(choice('+', '-'), $.expression)); },
        string_list_null_operator_expression: function ($) { return expression(9, seq($.expression, repeat1(choice($.string_operator_expression, $.list_operator_expression, $.null_operator_expression)))); },
        list_operator_expression: function ($) { return prec.left(choice(seq(word('in'), $.expression), seq('[', $.expression, ']'), seq('[', optional($.expression), '..', optional($.expression), ']'))); },
        string_operator_expression: function ($) { return prec.left(seq(choice(seq(word('starts'), word('with')), seq(word('ends'), word('with')), seq(word('contains'))), $.expression)); },
        null_operator_expression: function ($) { return seq(word('is'), optional(word('not')), word('null')); },
        property_or_labels_expression: function ($) { return expression(10, seq($.expression, choice(seq(repeat1($.property_lookup), optional($.node_labels)), seq(repeat($.property_lookup), $.node_labels)))); },
        atom: function ($) { return expression(11, choice($.literal, $.parameter, $.case_expression, 
        // TODO: Consider merging with function_invocation
        seq(word('count'), /\(\s*\*\s*\)/), $.list_comprehension, $.pattern_comprehension, seq(word('all'), '(', $.filter_expression, ')'), seq(word('any'), '(', $.filter_expression, ')'), seq(word('none'), '(', $.filter_expression, ')'), seq(word('single'), '(', $.filter_expression, ')'), $.relationships_pattern, $.parenthesized_expression, $.function_invocation, prec.left($.variable))); },
        literal: function ($) { return choice($.number_literal, $.string_literal, $.boolean_literal, $.null_literal, $.map_literal, $.list_literal); },
        null_literal: function () { return word('null'); },
        boolean_literal: function () { return choice(word('true'), word('false')); },
        list_literal: function ($) { return seq('[', $.expression, repeat(seq(',', $.expression)), ']'); },
        partial_comparison_expression: function ($) { return seq(choice('=', '<>', '<', '>', '<=', '>='), $.addition_expression); },
        parenthesized_expression: function ($) { return seq('(', $.expression, ')'); },
        relationships_pattern: function ($) { return seq($.node_pattern, prec.right(repeat1($.pattern_element_chain))); },
        filter_expression: function ($) { return seq($.id_in_coll, optional($.where)); },
        id_in_coll: function ($) { return prec(1, seq($.variable, word('in'), $.expression)); },
        function_invocation: function ($) { return seq($.function_name, '(', optional(word('distinct')), optional(seq($.expression, repeat(seq(',', $.expression)))), ')'); },
        function_name: function ($) { return choice(seq(optional($.namespace), $.symbolic_name), word('exists')); },
        explicit_procedure_invocation: function ($) { return seq($.procedure_name, '(', optional(seq($.expression, repeat(seq(',', $.expression)))), ')'); },
        implicit_procedure_invocation: function ($) { return $.procedure_name; },
        procedure_result_field: function ($) { return $.symbolic_name; },
        procedure_name: function ($) { return seq(optional($.namespace), $.symbolic_name); },
        namespace: function ($) { return repeat1(seq($.variable, '.')); },
        list_comprehension: function ($) { return seq('[', $.filter_expression, optional(seq('|', $.expression)), ']'); },
        // FIX: this rule is not generated because parenthesized_expression is
        // reduced rather than node_pattern (relationships_pattern) for cases like:
        // RETURN [()-->()WHERE a:Label|55 + a.prop]
        // FIX: should have increased precedence due to conflict with list_literal.
        pattern_comprehension: function ($) { return seq('[', optional(seq($.variable, '=')), $.relationships_pattern, optional(seq(word('where'), $.expression)), '|', $.expression, ']'); },
        property_lookup: function ($) { return seq('.', $.property_key_name); },
        case_expression: function ($) { return seq(choice(seq(word('case'), repeat($.case_alternatives)), seq(word('case'), $.expression, repeat($.case_alternatives))), optional(seq(word('else'), $.expression)), word('end')); },
        case_alternatives: function ($) { return seq(word('when'), $.expression, word('then'), $.expression); },
        variable: function ($) { return $.symbolic_name; },
        string_literal: function ($) { return choice(seq("'", repeat(choice(/[^'\\]+/, $.escaped_char)), "'"), seq("\"", repeat(choice(/[^"\\]+/, $.escaped_char)), "\"")); },
        escaped_char: function () { return token(seq('\\', choice('\\', "\"", "'", /[^uU]/, /[u][a-fA-F0-9]{4}/, /[U][a-fA-F0-9]{8}/))); },
        number_literal: function ($) { return choice($.double_literal, $.integer_literal); },
        map_literal: function ($) { return seq('{', optional(seq($.property_key_name, ':', $.expression, repeat(seq(',', $.property_key_name, ':', $.expression)))), '}'); },
        parameter: function ($) { return seq('$', choice($.symbolic_name, $.decimal_integer)); },
        property_expression: function ($) { return seq($.atom, repeat($.property_lookup)); },
        property_key_name: function ($) { return $.schema_name; },
        integer_literal: function ($) { return choice($.hex_integer, $.octal_integer, $.decimal_integer); },
        hex_integer: function () { return /0x[0-9a-f]+/i; },
        decimal_integer: function () { return choice('0', /[1-9][0-9]*/); },
        octal_integer: function () { return /0[0-7]+/; },
        double_literal: function ($) { return choice($.exponent_decimal_real, $.regular_decimal_real); },
        exponent_decimal_real: function () { return token(seq(choice(/[0-9]+/, seq(/[0-9]+/, '.', /[0-9]+/), seq('.', /[0-9]+/)), word('e'), optional('-'), /[0-9]+/)); },
        regular_decimal_real: function () { return /[0-9]*\.[0-9]+/; },
        schema_name: function ($) { return choice($.symbolic_name, $.reserved_word); },
        reserved_word: function () { return choice(word('all'), word('asc'), word('ascending'), word('by'), word('create'), word('delete'), word('desc'), word('descending'), word('detach'), word('exists'), word('limit'), word('match'), word('merge'), word('on'), word('optional'), word('order'), word('remove'), word('return'), word('set'), word('skip'), word('where'), word('with'), word('union'), word('unwind'), word('and'), word('as'), word('contains'), word('distinct'), word('ends'), word('in'), word('is'), word('not'), word('or'), word('starts'), word('xor'), word('false'), word('true'), word('null'), word('constraint'), word('unique'), word('case'), word('when'), word('then'), word('else'), word('end'), word('mandatory'), word('scalar'), word('of'), word('add'), word('drop')); },
        symbolic_name: function ($) { return prec.left(choice($.unescaped_symbolic_name, $.escaped_symbolic_name, word('count'), word('filter'), word('extract'), word('any'), word('none'), word('single'))); },
        unescaped_symbolic_name: function ($) { return (/(\p{ID_Start}|\p{Pc})(\p{ID_Continue}|\p{Sc})*/u); },
        escaped_symbolic_name: function () { return /`[^`]*`/; },
        comment: function ($) { return choice(seq('/*', repeat(choice(/[^\*]/, /\*[^\/]/)), '*/'), seq('//', /.*/, '\n')); },
        left_arrow_head: function () { return choice('<', "\u27E8", "\u3008", "\uFE64", "\uFF1C"); },
        right_arrow_head: function () { return choice('>', "\u27E9", "\u3009", "\uFE65", "\uFF1E"); },
        dash: function () { return choice('-', "\u00AD", "\u2010", "\u2011", "\u2012", "\u2013", "\u2014", "\u2015", "\u2212", "\uFE58", "\uFE63", "\uFF0D"); },
        _whitespace_char: function ($) { return token(choice("\t", "\n", "\v", "\f", "\r", "\u001C", "\u001D", "\u001E", "\u001F", " ", "\u1680", "\u180E", "\u2000", "\u2001", "\u2002", "\u2003", "\u2004", "\u2005", "\u2006", "\u2008", "\u2009", "\u200A", "\u2028", "\u2029", "\u205F", "\u3000", "\u00A0", "\u2007", "\u202F")); }
    }
});
// TODO: Add tests and use this function.
function comma_separated(rule) {
    return seq(rule, repeat(seq(',', rule)));
}
function word(keyword) {
    return alias(token(seq.apply(void 0, keyword
        .split('')
        .map(function (char) { return choice(char.toLowerCase(), char.toUpperCase()); }))), keyword);
}
function expression(precedence, rule, assoc) {
    if (assoc === void 0) { assoc = 'right'; }
    return prec[assoc](precedence, rule);
}
