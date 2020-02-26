"use strict";

class MobileNumber {
  get rules() {
    return {
      // validation rules
      mobile_no: "required"
    };
  }
  get messages() {
    return {
      "mobile_no.required": "Your mobile number is required"
    };
  }
  async fails(errorMessages) {
    return this.ctx.response.status(404).json({
      status: "Failed",
      message: errorMessages
    });
  }
}

module.exports = MobileNumber;
