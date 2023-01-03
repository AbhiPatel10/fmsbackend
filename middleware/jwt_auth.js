var jwt = require("jsonwebtoken");
const JWT_SECRET = "Front@end$army#FAMS";
const moment = require("moment");

const isExpired = (date) => {
  "use strict";
  try {
    let toDay = moment.utc();
    let expireDate = moment.utc(date);
    return expireDate < toDay;
  } catch (e) {
    return false;
  }
};

const jwt_auth = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("Authorization");
  if (!token) {
    res.status(400).send({ error: " token not found" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    const expired = isExpired(token.exp);
    if (expired) {
      res.status(401).send({ error: "Token is expired" });
    }
    next();
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = jwt_auth;
