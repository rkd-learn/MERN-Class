const { verify } = require("jsonwebtoken");

function verifyUser(req, res, next) {

  const token = req.headers.authorization

  if (!token) {
    next()
  } else {

    const tokenWithoutBearer = token.split(" ")[1]
    const secretLKey = process.env.JWT_SECRET_KEY || ""

    const isValidUserToken = verify(tokenWithoutBearer, secretLKey)

    if (!isValidUserToken) {
      return res.status(400).send({
        error: "Invalid token"
      })
    }
    next();
  }
}

module.exports = verifyUser;
