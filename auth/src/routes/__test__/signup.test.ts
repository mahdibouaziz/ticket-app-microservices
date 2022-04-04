import request from "supertest";
import { app } from "../../app";

it("return a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "mahdi@gmail.com",
      password: "mahdi123",
    })
    .expect(201);
});

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "mahdi.com",
      password: "mahdi123",
    })
    .expect(400);
});

it("returns a 400 with invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "mahdi@gmail.com",
      password: "d1",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "mahdi@gmail.com",
    })
    .expect(400);

  return request(app)
    .post("/api/users/signup")
    .send({
      password: "mahdi123",
    })
    .expect(400);
});
