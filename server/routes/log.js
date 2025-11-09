import express from "express";
import { logUserVisitController } from "../controllers/logController.js";

const router = express.Router();

export default function logUserVisitRouter(db) {

  router.post("/visit", async (req, res) => {
    const userKey = req.body.userKey;  // 또는 세션, JWT 등에서 가져옴
    const ip = req.ip;

    if (!userKey) return res.status(400).json({ success: false, error: "No userKey" });

    await logUserVisitController(db, userKey, ip);
    res.json({ success: true });
  });

  return router;
}