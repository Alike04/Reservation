const jwt = require("jsonwebtoken");
const User = require("../models/User")

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token || token === null) {
      throw new Error(401, "Authenticate again");
    }
    const result = jwt.verify(token, "asdkfhasdfujkhjk123c");
    const { userId } = result;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(401, "Authentication is failed");
    }
    req.userData = user;
    next();
  } catch {
    res.status(401).send();
  }
}

module.exports = { auth }