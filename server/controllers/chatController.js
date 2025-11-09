import { selectMessages,insertMessages } from "../models/chatModel.js";

export async function getMessagesController(db) {
  try {
    const messages = await selectMessages(db); // ✅ 모델에서 반환받기
    return messages; // ✅ 컨트롤러에서 반환
  } catch (err) {
    console.error("Get messages error:", err);
    return []; // 실패 시 빈 배열 반환
  }
}

export async function sendMessagesController(db, userKey, userIp, chatContent) {
  try {
    const result = await insertMessages(db, userKey, userIp, chatContent);
    return result;
  } catch (err) {
    console.error("send msg error:", err);
  }
}
