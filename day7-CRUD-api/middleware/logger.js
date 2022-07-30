function Logger(req, res, next) {
  console.log(`PATH=>`, req.url, `,Method=>`, req.method);
  next();
}

module.exports = Logger;