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
  "/api/account/about/visible/:about_id",
  "AboutController.setVisibility"
).middleware(["auth"]);
Route.put("/api/account/about/update/:about_id", "AboutController.update")
  .validator("About")
  .middleware(["auth"]);
Route.delete(
  "/api/account/about/delete/:about_id",
  "AboutController.delete"
).middleware(["auth"]);

//mobile number
Route.post("/api/account/mobile_no", "MobileNumberController.create")
  .validator("MobileNumber")
  .middleware(["auth"]);
Route.put(
  "/api/account/mobile_no/visible/:mobile_no_id",
  "MobileNumberController.setVisibility"
).middleware(["auth"]);
Route.put(
  "/api/account/mobile_no/update/:mobile_no_id",
  "MobileNumberController.update"
)
  .validator("MobileNumber")
  .middleware(["auth"]);
Route.delete(
  "/api/account/mobile_no/delete/:mobile_no_id",
  "MobileNumberController.delete"
).middleware(["auth"]);

//education
Route.post("/api/account/education", "EducationController.create")
  .validator("Education")
  .middleware(["auth"]);
Route.put(
  "/api/account/education/update/:education_id",
  "EducationController.update"
)
  .validator("Education")
  .middleware(["auth"]);
Route.delete(
  "/api/account/education/delete/:education_id",
  "EducationController.delete"
).middleware(["auth"]);
