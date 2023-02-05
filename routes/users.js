const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const users = require("../controllers/users");

router
  .route("/register")
  .get(users.renderRegister)
  .post(asyncHandler(users.registerUser));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
      failureMessage: true,
      keepSessionInfo: true,
    }),
    users.userLogin
  );

router.get("/logout", users.userLogout);

module.exports = router;
