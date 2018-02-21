const credentials = {
  client: {
    id: "83795e8a-830a-45d3-860e-3a6d662c4ea8",
    secret: "exjBPA144_+@$tjodHSEF36"
  },
  auth: {
    tokenHost: "https://login.microsoftonline.com",
    authorizePath: "common/oauth2/v2.0/authorize",
    tokenPath: "common/oauth2/v2.0/token"
  }
};
const oauth2 = require("simple-oauth2").create(credentials);

const redirectUri = "http://localhost:8000/authorize";

const scopes = ["openid", "User.Read", "Mail.Read"];

function getAuthUrl() {
  const returnVal = oauth2.authorizationCode.authorizeURL({
    redirect_uri: redirectUri,
    scope: scopes.join(" ")
  });
  console.log(`Generated auth url: ${returnVal}`);
  return returnVal;
}

exports.getAuthUrl = getAuthUrl;

async function getTokenFromCode(auth_code, callback, response) {
  let result = await oauth2.authorizationCode.getToken({
    code: auth_code,
    redirect_uri: redirectUri,
    scope: scopes.join(" ")
  });

  const token = oauth2.accessToken.create(result);
  console.log("Token created: ", token.token);
  return token;
}

exports.getTokenFromCode = getTokenFromCode;
