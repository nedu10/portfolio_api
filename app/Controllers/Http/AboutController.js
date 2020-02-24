"use strict";

const About = use("App/Models/About");
const Env = use("Env");
const UploadFile = use("App/HelperFunction/UploadFile");

class AboutController {
  async create({ request, response, auth }) {
    const { title, description } = request.post();
    const aboutImage = request.file("about_image", {
      types: ["image"],
      size: "3mb"
    });
    //   if (!aboutImage) {
    //     return response.status(404).json({
    //       status: 'Failed',
    //       message: 'About image is required'
    //     })
    //   }

    var aboutImageName = "";

    aboutImage
      ? (aboutImageName = `${new Date().getTime()}_${aboutImage.fieldName}.${
          aboutImage.extname
        }`)
      : null;

    try {
      var upload_file = null;
      aboutImage
        ? (upload_file = await UploadFile.createFile(
            response,
            aboutImage,
            "uploads/about-image",
            aboutImageName
          ))
        : null;

      console.log("new about upload file >> ", upload_file);

      const about = new About();
      about.title = title;
      about.description = description;
      aboutImage
        ? (about.img_url =
            Env.get("APP_URL", "127.0.0.1") +
            "/uploads/about-image/" +
            aboutImageName)
        : (about.img_url = null);
      about.user_id = auth.current.user.id;
      const save_about = await about.save();
      return response.status(201).json({
        status: "Success",
        message: "Successfully stored data",
        data: save_about
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
    const { about_id } = params;
    try {
      await About.query()
        .where("user_id", auth.current.user.id)
        .update({ set_visible: 0 });

      const update_about = await About.query()
        .where("user_id", auth.current.user.id)
        .andWhere("id", about_id)
        .update({ set_visible: true });
      return response.status(202).json({
        status: "Success",
        message: "Successfully set data to be visible",
        data: update_about
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: "Failed",
        message: "internal server error"
      });
    }
  }
}

module.exports = AboutController;