"use strict";
const User = use("App/Models/User");

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
  async update({ request, response, auth }) {
    const { name, title, reply_in, date_of_birth } = request.post();
    try {
      const authUser = auth.current.user;
      authUser.name = name ? name : authUser.name;
      authUser.title = title ? title : authUser.title;
      authUser.reply_in = reply_in ? reply_in : authUser.reply_in;
      authUser.date_of_birth = date_of_birth
        ? date_of_birth
        : authUser.date_of_birth;
      const updateUser = await authUser.save();
      return response.status(202).json({
        status: "Success",
        message: "successfully update user data",
        data: updateUser
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: "failed",
        message: "Internal server error"
      });
    }
  }
}

module.exports = UserController;
