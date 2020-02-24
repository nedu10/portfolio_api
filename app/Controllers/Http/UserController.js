"use strict";
const User = use("App/Models/User");
const Hash = use("Hash");

class UserController {
  async login({ request, response, auth }) {
    const { email, password } = request.post();
    try {
      const checkLoginUser = await User.query()
        .where("email", email)
        .first();
      if (!checkLoginUser) {
        return response.status(400).json({
          status: "Failed",
          message: "Invalid Credentials",
          details: "User does not exist"
        });
      }
      const loginUser = await auth.withRefreshToken().attempt(email, password);
      return response.status(202).json({
        status: "Success",
        message: "Successfully logged in",
        token: loginUser
      });
    } catch (error) {
      console.log(error);
      if (error.passwordField) {
        return response.status(400).json({
          status: "failed",
          message: "incorrect password"
        });
      }
      return response.status(500).json({
        status: "Failed",
        message: "Failed Internal server error",
        error: error
      });
    }
  }
}

module.exports = UserController;
