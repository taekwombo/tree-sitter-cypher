RETURN 1, 0x10, 0o5, 1, 5.2, .02e1, 2.3e-3, .1,
//     ^ number
//        ^ number
//              ^ number
//                   ^ number
//                      ^ number
//                           ^ number
//                                  ^ number
//                                          ^ number
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
//    ^ punctuation.delimiter
//       ^ punctuation.delimiter
//          ^ punctuation.delimiter
//             ^ punctuation.bracket
//              ^ punctuation.delimiter
    { key: 'value' };
//  ^ punctuation.bracket
//       ^ punctuation.delimiter
//                 ^ punctuation.bracket
//                  ^ punctuation.delimiter

