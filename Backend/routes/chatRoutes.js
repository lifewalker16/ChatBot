import express from "express";
import {createThread,getThread, getThreadByID,deleteThreadByID,handleChat} from "../controllers/chatController.js"
const router = express.Router();

router.post("/test",createThread);
router.get("/thread",getThread);
router.get("/thread/:threadId",getThreadByID);
router.delete("/thread/:threadId",deleteThreadByID)
router.post("/chat",handleChat);

export default router;