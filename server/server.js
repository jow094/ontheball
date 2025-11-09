import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import http from "http";
import { Server } from "socket.io";
import logUserVisitRouter from "./routes/logRouter.js";
import { getMessagesRouter, sendMessagesRouter } from "./routes/chatRouter.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORS 허용 도메인
const allowedOrigins = process.env.CORS_ORIGIN.split(",").map(s => s.trim());

// Socket.IO 서버
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

// 웹소켓 이벤트
io.on("connection", (socket) => {

  socket.on("disconnect", () => {
    console.log("사용자 연결 해제:", socket.id);
  });
});

// DB 풀 생성
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

await db.query("SET time_zone = '+09:00'");

// Middleware
app.use(express.json());
app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));

app.use((req, res, next) => {
  console.log("🛰 Origin:", req.headers.origin);
  next();
});

// 라우트
app.use("/api", logUserVisitRouter(db));
app.use("/api", getMessagesRouter(db));
app.use("/api", sendMessagesRouter(db,io));

// 기본 테스트 라우트
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.get("/api/dbTest", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT NOW() AS now");
    res.json({ success: true, time: rows[0].now });
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// 서버 실행
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`웹소켓 서버 실행중`));
