RETURN 1, 0x10, 05, 1, 5.2, .02e1, 2.3e-3,
//     ^ number
//        ^ number
//              ^ number
//                  ^ number
//                     ^ number
//                          ^ number
//                                 ^ number
    'String value', "String value \n \u1000",
//  ^ string
//                  ^ string
//                                ^ string.escape
//                                   ^ string.escape
    true, false,
//     ^ boolean
//           ^ boolean
    null,
//  ^ constant
    [1, 2, 3, 4],
//  ^ punctuation.bracket
//             ^ punctuation.bracket
    { key: 'value' };
//  ^ punctuation.bracket
//                 ^ punctuation.bracket

