import { insertVisitLog } from "../models/logModel.js";

export async function logUserVisitController(db, userKey, ip) {
  try {
    await insertVisitLog(db, userKey, ip);
  } catch (err) {
    console.error("Visit log error:", err);
  }
}
