/**
 * 방문/행동 로그 기록
 * @param {Pool} db - mysql2/promise 풀
 * @param {number} userKey - USER 테이블의 USER_KEY
 * @param {string} userId - 유저 아이디
 * @param {string} ip - 접속 IP
 * @param {string} kind - 행동 유형 (예: 'visit', 'login', 'click')
 */
export async function insertVisitLog(db, userKey, ip) {
  const query = `
    INSERT INTO LOG_USER (USER_KEY, USER_ID, USER_IP, LOG_KIND, DTM)
    VALUES (?, (SELECT USER_ID FROM USER WHERE USER_KEY = ?), ?, 'VISIT', NOW())
  `;
  await db.query(query, [userKey, userKey, ip]);
}
