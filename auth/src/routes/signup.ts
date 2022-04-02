import express from "express";

const router = express.Router();

router.post("/api/users/signup", (req, res, err) => {
  res.send("Hi there");
});

export { router as signupRouter };
