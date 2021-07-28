const express = require("express");
const userRouter = express.Router();
const {
  register,
  login,
  updateUser,
} = require("../controller/user.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/update_user").post(authenticateToken, updateUser);

module.exports = userRouter;
