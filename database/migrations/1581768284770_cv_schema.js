"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CvSchema extends Schema {
  up() {
    this.create("cvs", table => {
      table.increments();
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users");
      table.string("cv_url").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("cvs");
  }
}

module.exports = CvSchema;
