"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });

    //modified version of the hook
    // console.log("in model");
    // this.addHook("beforeSave", "UserHook.hashPassword");
  }

  //hide field from client
  static get hidden() {
    return ["password"];
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */

  //setting up connections
  tokens() {
    return this.hasMany("App/Models/Token");
  }
  about_me() {
    return this.hasOne("App/Models/About", "id", "user_id");
  }
  mobile_nos() {
    return this.hasMany("App/Models/MobileNo", "id", "user_id");
  }
  educational_achivements() {
    return this.hasMany("App/Models/Education", "id", "user_id");
  }
  services() {
    return this.hasMany("App/Models/Service", "id", "user_id");
  }
  cvs() {
    return this.hasMany("App/Models/Cv", "id", "user_id");
  }
}

module.exports = User;
