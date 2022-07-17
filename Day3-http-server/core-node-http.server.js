const http = require("http");

function onRequest(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });

  if (req.url === "/user") {
    // logic for user
    res.end("We created a user");
    return;
  }

  res.end("Hello World");
}

http
  .createServer(onRequest)
  .listen(4000)
  .on("listening", () => {
    console.log("Server is listening on port 4000");
  });
