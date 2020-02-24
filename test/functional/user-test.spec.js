"use strict";

const Env = use("Env");
const Factory = use("Factory");
const User = use("App/Models/User");
const { test, trait } = use("Test/Suite")("Login User");

trait("Test/ApiClient");

test("login a user and generates a jwt", async ({ assert, client }) => {
  // generate a fake user
  // const { email, password } = await Factory.model("App/Models/User").make();
  // make api request to register a new user
  const response = await client
    .post("/api/login")
    .send({
      email: "cifediorah3@gmail.com",
      password: "Chukwuemeka_11"
    })
    .end();

  // expect the status code to be 200
  response.assertStatus(202);

  // console.log("token >> ", response.body);

  assert.isDefined(response.body.token.type);
  assert.isDefined(response.body.token.token);

  Env.set("token", response.body.token.token);
}).timeout(0);

test("update user data", async ({ assert, client }) => {
  // generate a fake user
  const { name, title, reply_in } = await Factory.model(
    "App/Models/User"
  ).make();

  const response = await client
    .put("api/account/update")
    .header("Authorization", `Bearer ${Env.get("token")}`)
    .send({
      name,
      title,
      reply_in,
      date_of_birth: "2020-02-24"
    })
    .end();
  // console.log("response >>> ", response.body, name, " >> ", title, reply_in);
  response.assertStatus(202);
  // assert.equal(response.body.status, "Success");
  response.assertJSONSubset({
    status: "Success",
    message: "successfully update user data",
    data: true
  });
}).timeout(0);

// test('make sure 2 + 2 is 4', async ({ assert }) => {
//   assert.equal(2 + 2, 4)
// })
