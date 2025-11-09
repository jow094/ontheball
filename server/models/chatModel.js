/**
 * @param {Pool} db - mysql2/promise 풀
 * @param {number} userKey - USER 테이블의 USER_KEY
 * @param {string} userId - 유저 아이디
 * @param {string} ip - 접속 IP
 * @param {string} kind - 행동 유형 (예: 'visit', 'login', 'click')
 */
export async function selectMessages(db) {
  const query = `SELECT C.*,U.USER_ID,U.USER_NICK 
FROM CHAT C
LEFT JOIN USER U ON C.USER_KEY = U.USER_KEY
ORDER BY DATE_TIME ASC`;
  const [rows] = await db.query(query);
  return rows;
}

export async function insertMessages(db, userKey, userIp, chatContent) {
  const query = `
    INSERT CHAT(USER_KEY,USER_IP,CHAT_CONTENT,DATE_TIME) VALUES
    (?,?,?,now())
  `;
  const [result] = await db.query(query, [userKey, userIp, chatContent]);
  return result.insertId;
}
