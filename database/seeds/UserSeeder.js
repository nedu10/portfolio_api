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

const UserSeed = [
  {
    id: 1,
    name: "Chinedu Chukwuemeka Ifediorah",
    email: "cifediorah3@gmail.com",
    title: "Electrical and Electronics Engineer, Fullstack Software Developer",
    marital_status: "Single",
    reply_in: "24",
    password: "Chukwuemeka_11"
  }
];

class UserSeeder {
  async run() {
    await Database.raw("SET FOREIGN_KEY_CHECKS = 0;");
    await Database.truncate("users");

    await Database.from("users").insert(UserSeed);

    await Database.raw("SET FOREIGN_KEY_CHECKS = 1;");
  }
}

module.exports = UserSeeder;
