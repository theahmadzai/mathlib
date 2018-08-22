#!/usr/bin/env node
'use strict'

const fs = require('fs')
const interpreter = require('./interpreter')

module.exports = function(filePath = null) {

  if(filePath === null) {
    console.error('File path needed.')
    return
  }

  return interpreter(fs.readFileSync(filePath))
}
