'use strict'

const fs = require('fs')
const interpreter = require('./interpreter')

module.exports = function(math = null) {

  if(math === null) {
    console.error('No expression given.')
    return
  }

  return interpreter(math.valueOf())
}
