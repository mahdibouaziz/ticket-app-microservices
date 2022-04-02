import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res, err) => {
  res.send("Hi there");
});

export { router as signinRouter };
