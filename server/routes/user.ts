import express from "express";
import UserService from "../controllers/UserService";
const userService = new UserService();

const router = express.Router();
router.post("/register", async (req, res, next) => {
  
  //validate the request

  //check if user existed

  //created user

  //log user in
});

export default router;
