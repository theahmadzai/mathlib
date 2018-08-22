const matched = value => ({
  on: () => matched(value),
  otherwise: () => value
})

const match = value => ({
  on: (condition, callback) => (
    condition(value)
      ? matched(callback(value))
      : match(value)
  ),
  otherwise: callback => callback(value)
})

module.exports = match
