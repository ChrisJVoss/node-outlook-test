const http = require("http");
const url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    const pathName = url.parse(request.url).pathName;
    console.log(`Request for ${pathName} received.`);
    route(handle, pathName, response, request);
  }
  const port = 8000;
  http.createServer(onRequest).listen(port);
  console.log(`Server has started. Listening on port ${port} ...`);
}

exports.start = start;

