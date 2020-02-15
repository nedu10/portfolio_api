"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ContactSchema extends Schema {
  up() {
    this.create("contacts", table => {
      table.increments();
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users");
      table.string("name").notNullable();
      table.string("address", 1000).notNullable();
      table.string("subject", 1000).notNullable();
      table.text("message").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("contacts");
  }
}

module.exports = ContactSchema;
