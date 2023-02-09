const User = require("../models/User")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const bcrypt = require("bcrypt")
const ApiError = require("../utils/ApiError")
const jwt = require("jsonwebtoken")

const login = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const result = await bcrypt.compare(req.body.password, user.password);
  if (result) {
    return res.status(200).json({ user: user, token: generateToken(user) });
  } else {
    throw new ApiError(400, "Authorization fail");
  }
})
const register = asyncErrorHandler(async (req, res, next) => {
  let password = req.body.password;
  password = await bcrypt.hash(password, 10);
  req.body.password = password;

  const result = await User.isEmailTaken(req.body.email);
  if (result) {
    res.status(400).json({ error: "Email is already taken" })
  }
  const user = await User.create(req.body);
  return res.status(200).json({ user: user, token: generateToken(user) });
})

const authToken = asyncErrorHandler(async (req, res) => {
  try {
    const token = req.body.token;
    if (!token || token === null) {
      throw new Error(401, "Authenticate again");
    }
    const result = jwt.verify(token, "asdkfhasdfujkhjk123c");
    const { userId } = result;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(401, "Authentication is failed");
    }
    return res.status(200).json({ user: user });
  } catch (e) {
    res.status(401).send();
  }

})
function generateToken(user) {
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    "asdkfhasdfujkhjk123c",
    {
      expiresIn: "10h",
    }
  );
  return token;
}

module.exports = { register, login, authToken }
