const http = require('http');

console.log("Starting server...");
const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  res.end("Server is running");
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
