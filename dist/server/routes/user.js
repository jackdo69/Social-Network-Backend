var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import UserService from "../services/PostService.js";
const userService = new UserService();
const router = express.Router();
router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //   await userService.register(req.body);
    //   res.status(201).send({ message: "User registered successfully!" });
    // } catch (e) {
    //   res.status(400).send({ message: "Bad Request!" });
    //   throw e;
    // }
}));
export default router;
//# sourceMappingURL=user.js.map