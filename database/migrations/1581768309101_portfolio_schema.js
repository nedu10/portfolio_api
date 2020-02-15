"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PortfolioSchema extends Schema {
  up() {
    this.create("portfolios", table => {
      table.increments();
      table
        .integer("portfolio_category_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("portfolio_categories");
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users");
      table.string("title").notNullable();
      table.string("short_description");
      table.text("description");
      table.string("portfolio_url_img");
      table.timestamps();
    });
  }

  down() {
    this.drop("portfolios");
  }
}

module.exports = PortfolioSchema;
