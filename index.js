const server = require("./server");
const router = require("./router");

const handle = {};
handle["/"] = home;

server.start(router.route, handle);

function home(response, request) {
  console.log("Request handler 'home' was called.");
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("<p>Hello world!</p>");
  response.end();
}
