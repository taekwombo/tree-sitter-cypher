export const OCT_INT = /0o(_?[0-7])+/;
export const HEX_INT = /0x(_?[0-9a-f])+/i;
export const DEC_INT = /[0-9](_?[0-9])*/;

const DECIMAL =  token.immediate(seq(
    optional(DEC_INT),
    '.',
    DEC_INT,
));

const DECIMAL_SCIENTIFIC = token.immediate(seq(
    choice(DEC_INT, DECIMAL),
    choice('e', 'E'),
    optional(choice('-', '+')),
    DEC_INT,
));

export const DECIMAL_LITERAL = token.immediate(seq(
    choice(DECIMAL, DECIMAL_SCIENTIFIC),
    optional(
        choice('f', 'F', 'd', 'D'),
    )
));
