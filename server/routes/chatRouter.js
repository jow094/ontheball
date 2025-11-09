import express from "express";
import { getMessagesController, sendMessagesController } from "../controllers/chatController.js";

const router = express.Router();

export function getMessagesRouter(db) {
  router.get("/chat", async (req, res) => {
    try {
      const messages = await getMessagesController(db);
      res.json(messages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "DB error" });
    }
  });

  return router;
}

export function sendMessagesRouter(db, io) {
  router.post("/chat", async (req, res) => {
    const userKey = req.body.userKey;
    const userId = req.body.userId;
    const userNick = req.body.userNick;
    const chatContent = req.body.chatContent;
    const userIp = req.ip;

    if (!userKey) return res.status(400).json({ success: false, error: "No userKey" });

    const chatKey = await sendMessagesController(db, userKey, userIp, chatContent);

    const newMessage = { chatKey, userKey, userId, userNick, chatContent, userIp: userIp, dateTime: new Date() };

    io.emit("chat", newMessage);

    res.json({ success: true });
  });

  return router;
}
