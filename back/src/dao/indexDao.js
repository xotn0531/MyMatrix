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
  content
) {
  let connection;
  try {
    connection = await pool.getConnection(async (conn) => conn);
    const insertDiaryQuery =
      "INSERT INTO diary (userId, emotionStatus, emotionScore, content) VALUES (?, ?, ?, ?);";
    const insertDiaryParams = [userId, emotionStatus, emotionScore, content];

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

    // 날짜만 추출하는 로직 (시간을 제외하고 'YYYY-MM-DD' 형식으로 변환)
    const formattedDate = date.split(" ")[0]; // date가 'YYYY-MM-DD HH:MM:SS' 형식일 경우 'YYYY-MM-DD'만 추출

    const selectDiaryByDateQuery =
      "SELECT * FROM diary WHERE userId = ? AND DATE(writeAt) = ?";
    const selectDiaryByDateParams = [userId, formattedDate];

    const [row] = await connection.query(selectDiaryByDateQuery, selectDiaryByDateParams);

    console.log("Query Parameters - userId:", userId, "date:", formattedDate); // 파라미터 확인
    console.log("Query Result:", row); // 결과 확인

    return row;
  } catch (err) {
    console.error(` #### selectDiaryByDate Query/DB error #### \n ${err}`);
    return [];
  } finally {
    if (connection) connection.release();
  }
};
