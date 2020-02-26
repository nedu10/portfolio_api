"use strict";

const MobileNumber = use("App/Models/MobileNo");

class MobileNumberController {
  async create({ request, response, auth }) {
    const { mobile_no } = request.post();

    try {
      const new_mobile_no = new MobileNumber();
      new_mobile_no.phone_number = mobile_no;
      new_mobile_no.user_id = auth.current.user.id;
      const save_mobile_no = await new_mobile_no.save();

      return response.status(201).json({
        status: "Success",
        message: "Successfully stored data",
        data: save_mobile_no
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: "Failed",
        message: "internal server error"
      });
    }
  }

  async setVisibility({ response, auth, params }) {
    const { mobile_no_id } = params;
    try {
      await MobileNumber.query()
        .where("user_id", auth.current.user.id)
        .update({ is_displayed: 0 });

      const update_mobile_no = await MobileNumber.query()
        .where("user_id", auth.current.user.id)
        .andWhere("id", mobile_no_id)
        .update({ is_displayed: true });

      return response.status(202).json({
        status: "Success",
        message: "Successfully set data to be visible",
        data: update_mobile_no
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: "Failed",
        message: "internal server error"
      });
    }
  }

  async update({ response, auth, request, params }) {
    const { mobile_no } = request.post();
    const { mobile_no_id } = params;

    try {
      const get_mobile_no = await MobileNumber.query()
        .where("id", mobile_no_id)
        .andWhere("user_id", auth.current.user.id)
        .first();

      if (!get_mobile_no) {
        return response.status(404).json({
          status: "Failed",
          message: "Data does not exist for this user"
        });
      }

      get_mobile_no.phone_number = mobile_no
        ? mobile_no
        : get_mobile_no.phone_number;

      const update_mobile_no = await get_mobile_no.save();

      return response.status(202).json({
        status: "Success",
        message: "Successfully updated mobile number",
        data: update_mobile_no
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: "Failed",
        message: "internal server error"
      });
    }
  }

  async delete({ response, auth, params }) {
    const { mobile_no_id } = params;
    try {
      const authenticatedUser = auth.current.user;
      const get_mobile_no = await MobileNumber.query()
        .where("id", mobile_no_id)
        .andWhere("user_id", authenticatedUser.id)
        .first();
      if (!get_mobile_no) {
        return response.status(404).json({
          status: "Failed",
          message: "Data does not exist"
        });
      } else {
        await get_mobile_no.delete();
        return response.status(200).json({
          status: "Success",
          message: "Successfully deleted mobile number data"
        });
      }
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: "Failed",
        message: "internal server error"
      });
    }
  }
}

module.exports = MobileNumberController;
