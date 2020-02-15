"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EducationSchema extends Schema {
  up() {
    this.create("educations", table => {
      table.increments();
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users");
      table.string("institution");
      table.datetime("start_date").notNullable();
      table.datetime("end_date").notNullable();
      table
        .boolean("to_present")
        .notNullable()
        .defaultTo(0);
      table.string("grade");
      table.string("description");
      table.timestamps();
    });
  }

  down() {
    this.drop("educations");
  }
}

module.exports = EducationSchema;
