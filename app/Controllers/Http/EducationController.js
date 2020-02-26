"use strict";
const Education = use("App/Models/Education");

class EducationController {
  async create({ request, response, auth }) {
    const {
      institution,
      start_date,
      end_date,
      to_present,
      grade,
      description
    } = request.post();

    try {
      const new_education = new Education();
      new_education.institution = institution;
      new_education.start_date = start_date;
      new_education.end_date = end_date;
      !to_present ? (new_education.to_present = to_present) : null;
      new_education.grade = grade;
      new_education.description = description;
      new_education.user_id = auth.current.user.id;
      const save_education = await new_education.save();

      return response.status(201).json({
        status: "Success",
        message: "Successfully stored data",
        data: save_education
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
    const {
      institution,
      start_date,
      end_date,
      to_present,
      grade,
      description
    } = request.post();
    const { education_id } = params;

    try {
      const get_education = await Education.query()
        .where("id", education_id)
        .andWhere("user_id", auth.current.user.id)
        .first();

      if (!get_education) {
        return response.status(404).json({
          status: "Failed",
          message: "Data does not exist for this user"
        });
      }

      get_education.institution = institution;
      get_education.start_date = start_date;
      get_education.end_date = end_date;
      !to_present ? (get_education.to_present = to_present) : null;
      get_education.grade = grade;
      get_education.description = description;

      const update_education = await get_education.save();

      return response.status(202).json({
        status: "Success",
        message: "Successfully updated education",
        data: update_education
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
    const { education_id } = params;
    try {
      const authenticatedUser = auth.current.user;
      const get_education = await Education.query()
        .where("id", education_id)
        .andWhere("user_id", authenticatedUser.id)
        .first();
      if (!get_education) {
        return response.status(404).json({
          status: "Failed",
          message: "Data does not exist"
        });
      } else {
        await get_education.delete();
        return response.status(200).json({
          status: "Success",
          message: "Successfully deleted Education data"
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

module.exports = EducationController;
