// guard function that will confirm if a user is authenticated or logged in to our app...
const jwt = require("jsonwebtoken");

exports.guard = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Milners token works!!", token);

  if (!token) {
    return res.status(401).send("User not authorized!");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
    if (err) {
      console.error("JWT Error:", err);
      return res.status(401).send("User not authorized! (jwt)");
    }

    next();
  });
};
