const match = require('./match')
const {
  isLiteral,
  isVariable,
  isOperator,
  isFunction,
  isLeftParenthesis,
  isRightParenthesis,
  isArgumentSeparator } = require('./type').tokenTypes

function Node(token, left, right) {
  this.token = token
  this.left = left
  this.right = right
}

const parser = (tokens = []) => {
  const queue = []
  const stack = []

  const assoc = {
    '^': 'right',
    '*': 'left',
    '/': 'left',
    '+': 'left',
    '-': 'left'
  }

  const prec = {
    '^': '4',
    '*': '3',
    '/': '3',
    '+': '2',
    '-': '2'
  }

  Array.prototype.peek = function() {
    return this[this.length-1]
  }

  Array.prototype.addNode = function (operatorToken) {
    const right = this.pop()
    const left = this.pop()
    this.push(new Node(operatorToken, left, right))
  }

  tokens.forEach(token => {
    match(token)
      .on(x => isLiteral(x) || isVariable(x), x => {
        stack.push(new Node(x, null, null))
      })
      .on(x => isOperator(x), x => {
        while( queue.peek()
          && isOperator(queue.peek())
          && prec[queue.peek().value] >= prec[x.value]
        ) {
          stack.addNode(queue.pop())
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

  while(queue.peek()) {
    stack.addNode(queue.pop())
  }

  return stack.pop()
}

module.exports = parser
