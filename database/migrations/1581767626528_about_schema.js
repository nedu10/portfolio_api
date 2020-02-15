"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AboutSchema extends Schema {
  up() {
    this.create("abouts", table => {
      table.increments();
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users");
      table.string("title", 1000).notNullable();
      table.text("description").notNullable();
      table.string("img_url");
      table.timestamps();
    });
  }

  down() {
    this.drop("abouts");
  }
}

module.exports = AboutSchema;
