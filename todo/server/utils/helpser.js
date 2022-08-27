const { hash } = require("bcryptjs")

const createPasswordHash = (password) => {
  return hash(password, 100)
}

module.exports = {
  createPasswordHash
}
