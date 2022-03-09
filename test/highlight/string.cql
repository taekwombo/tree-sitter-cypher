MATCH
    (a: { name: 'String value' }),
//              ^ string
    (b: { name: "String value \n \u1000" })
//              ^ string
//                            ^ string.escape
//                               ^ string.escape
RETURN 1;
