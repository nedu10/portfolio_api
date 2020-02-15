"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ServiceSchema extends Schema {
  up() {
    this.create("services", table => {
      table.increments();
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users");
      table.string("title").notNullable();
      table.text("description");
      table.string("service_img_url");
      table.timestamps();
    });
  }

  down() {
    this.drop("services");
  }
}

module.exports = ServiceSchema;
