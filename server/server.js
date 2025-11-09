import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import logUserVisitRouter from "./routes/log.js";

dotenv.config();

const app = express();

// DB 연결 설정
const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "", // 비밀번호 없으면 빈 문자열
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api", logUserVisitRouter(db));

// ✅ 기본 라우트
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

// ✅ 예시 API
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// ✅ 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// DB테스트
app.get("/api/dbTest", async (req, res) => {
  try {
    console.log('try to connect db');
    const [rows] = await db.query("SELECT NOW() AS now");
    res.json({ success: true, time: rows[0].now });
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

