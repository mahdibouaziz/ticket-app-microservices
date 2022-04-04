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
