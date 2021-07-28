const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).send({ message: "Please Login to access" });

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  req.user = await User.findOne({ _id: decoded.id });
  next();
};
