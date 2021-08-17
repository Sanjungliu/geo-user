const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const access_token = req.headers.access_token;
  if (access_token) {
    const payload = jwt.verify(access_token, "rahasia");
    console.log(payload, `ini payload`);
  }
};
