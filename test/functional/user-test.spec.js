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

  console.log("token >> ", response.body);

  assert.isDefined(response.body.token.type);
  assert.isDefined(response.body.token.token);

  Env.set("token", response.body.token.token);
});

// test('make sure 2 + 2 is 4', async ({ assert }) => {
//   assert.equal(2 + 2, 4)
// })
