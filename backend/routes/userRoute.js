import express from "express";
import { logout, login, register, GetOtherUsers } from "../controllers/userController.js";
import isAuthed from "../middleware/isAuth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthed, GetOtherUsers);

export default router;