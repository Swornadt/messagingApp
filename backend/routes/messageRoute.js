import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import isAuthed from "../middleware/isAuth.js";

const router = express.Router();

router.route("/send/:id").post(isAuthed, sendMessage);
router.route("/:id").get(isAuthed, getMessage);
export default router;