"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Hash = use("Hash");
const Database = use("Database");

// Factory.blueprint('App/Models/User', (faker) => {
//     return {
//       username: faker.username()
//     }
//   })

Factory.blueprint("App/Models/User", async faker => {
  await Database.truncate("users");
  return {
    id: 1,
    name: "Chinedu Chukwuemeka Ifediorah",
    email: "cifediorah3@gmail.com",
    title: "Electrical and Electronics Engineer, Fullstack Software Developer",
    marital_status: "Single",
    reply_in: "24",
    password: await Hash.make("Chukwuemeka_11")
  };
});
