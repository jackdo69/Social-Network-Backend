import express from "express";
import UserService from "../services/PostService.js";
const userService = new UserService();

const router = express.Router();
router.post("/register", async (req, res, next) => {
  // try {
  //   await userService.register(req.body);
  //   res.status(201).send({ message: "User registered successfully!" });
  // } catch (e) {
  //   res.status(400).send({ message: "Bad Request!" });
  //   throw e;
  // }
});

export default router;
