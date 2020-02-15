"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PortfolioCategorySchema extends Schema {
  up() {
    this.create("portfolio_categories", table => {
      table.increments();
      table.string("title").notNullable();
      table.text("description");
      table.timestamps();
    });
  }

  down() {
    this.drop("portfolio_categories");
  }
}

module.exports = PortfolioCategorySchema;
