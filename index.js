const server = require("./server");
const router = require("./router");
const authHelper = require("./authHelper");

const handle = {};
handle["/"] = home;
handle["/authorize"] = authorize;

server.start(router.route, handle);

function home(response, request) {
  console.log("Request handler 'home' was called.");
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(
    `<p>Please <a href="${authHelper.getAuthUrl()}">sign in</a> with your Office 365 or Outlook.com account.</p>`
  );
  response.end();
}

const url = require("url");
function authorize(response, request) {
  console.log("Request handler 'authorize' was called.");

  // The authorization code is passed as a query parameter
  const url_parts = url.parse(request.url, true);
  const code = url_parts.query.code;
  console.log(`Code: ${code}`);
  processAuthCode(response, code);
}
