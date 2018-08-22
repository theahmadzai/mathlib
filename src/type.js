const charTypes = {
  isDigit: x => /\d|\./.test(x),

  isLetter: x => /[a-z]/i.test(x),

  isOperator: x => /\+|-|\*|\/|\^/.test(x),

  isLeftParenthesis: x => /\(/.test(x),

  isRightParenthesis: x => /\)/.test(x),

  isComma: x => /,/.test(x)
}

const tokenTypes = {
  isLiteral: x => x.type === 'Literal',

  isVariable: x => x.type === 'Variable',

  isOperator: x => x.type === 'Operator',

  isFunction: x => x.type === 'Function',

  isLeftParenthesis: x => x.type === 'Left Parenthesis',

  isRightParenthesis: x => x.type === 'Right Parenthesis',

  isArgumentSeparator: x => x.type === 'Function Argument Separator'
}

module.exports = {
  charTypes,
  tokenTypes
}
