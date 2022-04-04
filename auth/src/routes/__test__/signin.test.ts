import request from "supertest";
import { app } from "../../app";

it("fails when email does not exists supplies", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "mahdi@gmail.com",
      password: "mahdi123",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "mahdi@gmail.com",
      password: "mahdi123",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signin")
    .send({
      email: "mahdi@gmail.com",
      password: "mahdi1234",
    })
    .expect(400);
});

it("response wih a cookie when given a valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "mahdi@gmail.com",
      password: "mahdi123",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "mahdi@gmail.com",
      password: "mahdi123",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
