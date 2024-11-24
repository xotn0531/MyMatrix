const { pool } = require("../database");

// 전체 사용자 조회
exports.getUserRows = async function () {
  let connection;
  try {
    connection = await pool.getConnection(async (conn) => conn);
    const selectUserQuery = "SELECT * FROM Users;";
    const [rows] = await connection.query(selectUserQuery);
    return rows;
  } catch (err) {
    console.error(`#### getUserRows Query/DB error #### \n ${err}`);
    return false;
  } finally {
    if (connection) connection.release();
  }
};

// 일기 삽입
exports.insertDiary = async function (
  userId,
  보통,
  행복,
  슬픔,
  화남,
  emotionStatus,
  content
) {
  let connection;
  try {
    connection = await pool.getConnection(async (conn) => conn);
    const insertDiaryQuery =
      "INSERT INTO diary (userId, 보통, 행복, 슬픔, 화남, emotionStatus, content) VALUES (?, ?, ?, ?, ?, ?, ?);";
    const insertDiaryParams = [
      userId,
      보통,
      행복,
      슬픔,
      화남,
      emotionStatus,
      content,
    ];

    const [result] = await connection.query(insertDiaryQuery, insertDiaryParams);
    return result;
  } catch (err) {
    console.error(`#### insertDiary Query/DB error #### \n ${err}`);
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
      "SELECT 보통, 행복, 슬픔, 화남, emotionStatus, content, writeAt FROM diary WHERE userId = ? AND DATE(writeAt) = ?;";
    const selectDiaryByDateParams = [userId, date];

    const [rows] = await connection.query(selectDiaryByDateQuery, selectDiaryByDateParams);

    return rows;
  } catch (err) {
    console.error(`#### selectDiaryByDate Query/DB error #### \n ${err}`);
    return [];
  } finally {
    if (connection) connection.release();
  }
};
