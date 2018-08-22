const lexer = require('./lexer')
const rpnParser = require('./rpn-parser')
const {
  isOperator,
  isDigit } = require('./type').charTypes

const interpreter = (code) => {
  return code.toString('ascii').split('\n').filter(line => line.length > 0).map(line => {
    const rpn = rpnParser(lexer(line))

    const stack = []
    const queue = []

    rpn.forEach(({ value }) => {

      if(isOperator(value)) {
        let operator = (value === '^') ? '**' : value
        let convert = false

        if(queue.length >=1 && stack.length >= 2) {
          operator = queue.pop()
          convert = true
        }

        if(stack.length >= 2) {
          const y = stack.pop()
          const x = stack.pop()
          stack.push(eval( '(' + x + ')' + operator + '(' + y + ')'))
          if(convert == false ){
            return
          }
        }

        if(convert == true && value !== '*' && value !== '/') {
          const x = stack.pop()
          stack.push(eval(value + '(' + x + ')'))
        }

        if(convert == false && stack.length < 2 && value !== '*' && value !== '/') {
          const x = stack.pop()
          stack.push(eval(value + '(' + x + ')'))
        }

        else if(stack.length < 2 && value === '*' || value === '/') {
          queue.push(value)
        }

      }
      else stack.push(value)

    })

    return stack.pop()
  })
}

module.exports = interpreter
