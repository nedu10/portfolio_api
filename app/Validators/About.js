"use strict";

class About {
  get rules() {
    return {
      // validation rules
      title: "required",
      description: "required"
    };
  }
  get messages() {
    return {
      "title.required": "Your title is required",
      "description.required": "Your description is required"
    };
  }
  async fails(errorMessages) {
    return this.ctx.response.status(404).json({
      status: "Failed",
      message: errorMessages
    });
  }
}

module.exports = About;
