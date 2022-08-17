
require('dotenv').config()

const http = require('http')
const port = process.env.PORT || 3000
const url = require("url");
const { onSynthesizeRequest } = require("./handles/onSynthesizeRequest");
const { onHomeRequest } = require("./handles/onHomeRequest");

const server = http.createServer((req, res) => {
  const reqURL = url.parse(req.url).pathname

  switch (reqURL) {
    case '/':
      onHomeRequest(res);
      break;
    case '/synthesize':
      onSynthesizeRequest(req, res);
      break;
    default:
      res.end()
      break;
  }
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})