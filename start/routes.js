"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello welcome to my portfolio api" };
});

//Login
Route.post("/api/login", "UserController.login").middleware(["guest"]);

// user
Route.put("/api/account/update", "UserController.update").middleware(["auth"]);

//about
Route.post("/api/account/about", "AboutController.create")
  .validator("About")
  .middleware(["auth"]);
Route.put(
  "/api/account/about/:about_id",
  "AboutController.setVisibility"
).middleware(["auth"]);
