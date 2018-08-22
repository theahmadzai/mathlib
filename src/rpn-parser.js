const match = require('./match')
const {
  isLiteral,
  isVariable,
  isOperator,
  isFunction,
  isLeftParenthesis,
  isRightParenthesis,
  isArgumentSeparator } = require('./type').tokenTypes

const parser = (tokens = []) => {
  const stack = []
  const queue = []

  const prec = {
    '^': '4',
    '/': '3',
    '*': '3',
    '+': '2',
    '-': '2'
  }

  Array.prototype.peek = function() {
    return this[this.length-1]
  }

  tokens.forEach(token => {
    match(token)
      .on(x => isLiteral(x) || isVariable(x), x => {
        stack.push(x)
      })
      .on(x => isOperator(x), x => {
        while( queue.peek()
          && isOperator(queue.peek())
          && prec[queue.peek().value] >= prec[x.value]
        ) {
          stack.push(queue.pop())
        }
        queue.push(x)
      })
      .on(x => isFunction(x), x => {})
      .on(x => isLeftParenthesis(x), x => {})
      .on(x => isRightParenthesis(x), x => {})
      .on(x => isArgumentSeparator(x), x => {})
      .otherwise(x => {
        console.log(`Invalid token ${ JSON.stringify(token) }`)
      })
  })

  return stack.concat(queue.reverse())
}

module.exports = parser
