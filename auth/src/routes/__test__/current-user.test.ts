import request from "supertest";
import { app } from "../../app";

it("response the details about the current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);
  expect(response.body.currentUser.email).toEqual("mahdi@gmail.com");
});

it("response with null if not authenticated", async () => {
  const response = await request(app).get("/api/users/currentuser").expect(200);
  expect(response.body.currentUser).toEqual(null);
});
