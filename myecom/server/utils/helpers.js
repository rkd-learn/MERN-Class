const { sign } = require("jsonwebtoken")

const createToken = (user) => {

  const secret = process.env.JWT_SECRET_KEY || ""

  const userPayload = {
    email: user.email,
    id: user._id
  }

  const accessToken = sign(userPayload, secret, {
    expiresIn: '7d'
  })

  return accessToken
}

module.exports = {
  createToken
}
