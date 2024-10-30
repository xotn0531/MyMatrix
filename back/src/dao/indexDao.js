const { pool } = require("../database");

// 전체 사용자 조회
exports.getUserRows = async function () {
  let connection;
  try {
    connection = await pool.getConnection(async (conn) => conn);
    const selectUserQuery = "SELECT * FROM Users;";

    const [row] = await connection.query(selectUserQuery);
    return row;
  } catch (err) {
    console.error(` #### getUserRows Query/DB error #### \n ${err}`);
    return false;
  } finally {
    if (connection) connection.release();
  }
};

// 일기 삽입
exports.insertDiary = async function (
  userId,
  emotionStatus,
  emotionScore,
  content,
  consolation,
  summarize
) {
  let connection;
  try {
    connection = await pool.getConnection(async (conn) => conn);
    const insertDiaryQuery =
      "INSERT INTO diary (userId, emotionStatus, emotionScore, content, consolation, summarize) VALUES (?, ?, ?, ?, ?, ?);";
    const insertDiaryParams = [userId, emotionStatus, emotionScore, content, consolation, summarize];

    const [row] = await connection.query(insertDiaryQuery, insertDiaryParams);
    return row;
  } catch (err) {
    console.error(` #### insertDiary Query/DB error #### \n ${err}`);
    return false;
  } finally {
    if (connection) connection.release();
  }
};

// 특정 날짜의 일기 조회
exports.selectDiaryByDate = async function (userId, date) {
  let connection;
  try {
    connection = await pool.getConnection(async (conn) => conn);
    const selectDiaryByDateQuery =
      "SELECT * FROM diary WHERE userId = ? AND DATE(writeAt) = ?;";
    const selectDiaryByDateParams = [userId, date];

    const [row] = await connection.query(selectDiaryByDateQuery, selectDiaryByDateParams);
    return row;
  } catch (err) {
    console.error(` #### selectDiaryByDate Query/DB error #### \n ${err}`);
    return false;
  } finally {
    if (connection) connection.release();
  }
};
