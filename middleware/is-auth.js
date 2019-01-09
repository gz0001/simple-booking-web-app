const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // get auth header and verify
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  // get bearer token and verify
  const token = authHeader.split(" ")[1]; // 'Bearer $token'
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  // verify token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "truong92");
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  // return auth data
  req.isAuth = true;
  req.userId = decodedToken.userId;
  req.userEmail = decodedToken.email;
  return next();
};
