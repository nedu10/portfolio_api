"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MobileNoSchema extends Schema {
  up() {
    this.create("mobile_nos", table => {
      table.increments();
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users");
      table
        .bigInteger("phone_number")
        .unique()
        .notNullable();
      table
        .boolean("is_displayed")
        .notNullable()
        .defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("mobile_nos");
  }
}

module.exports = MobileNoSchema;
