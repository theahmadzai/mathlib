const match = require('./match')
const {
  isDigit,
  isLetter,
  isOperator,
  isLeftParenthesis,
  isRightParenthesis,
  isComma } = require('./type').charTypes

function Token(type, value) {
  this.type = type
  this.value = value
}

const lexer = (code = null) => {
  code = code.split('').filter(char => char !== '')

  const tokens = []
  const numberBuffer = []
  const letterBuffer = []

  const pushOperator = (x = '*') => {
    tokens.push(new Token('Operator', x))
  }

  const pushFunction = () => {
    tokens.push(new Token('Function', letterBuffer.join('')))
    letterBuffer.length = 0
  }

  const pushLeftParenthesis = (x) => {
    tokens.push(new Token('Left Parenthesis', x))
  }

  const pushRightParenthesis = (x) => {
    tokens.push(new Token('Right Parenthesis', x))
  }

  const pushArgumentSeparator = (x) => {
    tokens.push(new Token('Function Argument Separator', x))
  }

  const pushNumberBuffer = () => {
    if(numberBuffer.length) {
      tokens.push(new Token('Literal', numberBuffer.join('')))
      numberBuffer.length = 0
    }
  }

  const pushLetterBuffer = () => {
    for(let i =0; i<letterBuffer.length; i++){
      tokens.push(new Token('Variable', letterBuffer[i]))
      if(i<letterBuffer.length-1) {
        pushOperator()
      }
    }
    letterBuffer.length = 0
  }

  code.forEach(char => {
    match(char)
      .on(x => isDigit(x), x => {
        if(letterBuffer.length) {
          pushLetterBuffer()
          pushOperator()
        }
        numberBuffer.push(x)
      })
      .on(x => isLetter(x), x => {
        if(numberBuffer.length) {
          pushNumberBuffer()
          pushOperator()
        }
        letterBuffer.push(x)
      })
      .on(x => isOperator(x), x => {
        pushNumberBuffer()
        pushLetterBuffer()
        pushOperator(x)
      })
      .on(x => isLeftParenthesis(x), x => {
        if(letterBuffer.length) {
          pushFunction()
        } else if(numberBuffer.length){
          pushNumberBuffer()
          pushOperator()
        }
        pushLeftParenthesis(x)
      })
      .on(x => isRightParenthesis(x), x => {
        pushNumberBuffer()
        pushLetterBuffer()
        pushRightParenthesis(x)
      })
      .on(x => isComma(x), x => {
        pushNumberBuffer()
        pushLetterBuffer()
        pushArgumentSeparator(x)
      })
      .otherwise(x => {
        console.log(`No Match: ${ x }`)
      })
  })

  pushNumberBuffer()
  pushLetterBuffer()

  return tokens
}

module.exports = lexer
