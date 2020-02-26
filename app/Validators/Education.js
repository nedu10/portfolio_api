"use strict";

class Education {
  get rules() {
    return {
      // validation rules
      institution: "required",
      to_present: "required",
      start_date: "required"
    };
  }
  get messages() {
    return {
      "institution.required": "Your institution is required",
      "to_present.required": "to_present field is required",
      "start_date.required": "start_date field is required"
    };
  }
  async fails(errorMessages) {
    return this.ctx.response.status(404).json({
      status: "Failed",
      message: errorMessages
    });
  }
}

module.exports = Education;
