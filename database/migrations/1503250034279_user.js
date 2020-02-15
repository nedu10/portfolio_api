"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    // console.log("showing default value >> ", this.fn.now());
    this.create("users", table => {
      table.increments();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("name").notNullable();
      table.string("title").notNullable();
      table.datetime("date_of_birth");
      table.string("reply_in");
      table.string("marital_status");
      table.string("password", 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
