const jwt = require("jsonwebtoken");

//function to verify authentication
export default function (req, res, next) {
  const token = req.header("authorization");
  console.log("req.header is", req.headers)
  if (!token) {
    res.status(401).send("Access Denied");
  } else {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      res.user = verified;
      next();
    } catch (err) {
      res.status(400).send("Invalid Token");
    }
  }
}