"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Database = use("Database");
const Hash = use("Hash");

class UserSeeder {
  async run() {
    const newPass = await Hash.make("Chukwuemeka_11");
    const UserSeed = [
      {
        id: 1,
        name: "Chinedu Chukwuemeka Ifediorah",
        email: "cifediorah3@gmail.com",
        title:
          "Electrical and Electronics Engineer, Fullstack Software Developer",
        reply_in: "24",
        password: newPass
      }
    ];
    await Database.raw("SET FOREIGN_KEY_CHECKS = 0;");
    await Database.truncate("users");

    await Database.from("users").insert(UserSeed);

    await Database.raw("SET FOREIGN_KEY_CHECKS = 1;");
    // const User = await Factory.model("App/Models/User").create();
  }
}

module.exports = UserSeeder;
