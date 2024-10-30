const { pool } = require("../database");

// 회원 정보 삽입
exports.insertUser = async function (email, password, nickname, hwId) {
  let connection;
  try {
    connection = await pool.getConnection(async (conn) => conn);
    const insertUserQuery =
      "INSERT INTO users (email, password, nickname, hwId) VALUES (?, ?, ?, ?);";
    const insertUserParams = [email, password, nickname, hwId];
    
    const [row] = await connection.query(insertUserQuery, insertUserParams);
    return row;

  } catch (err) {
    console.error(` #### insertUser Query/DB error #### \n ${err}`);
    return false;
  } finally {
    if (connection) connection.release();
  }
};

// 이메일로 사용자 조회
exports.selectUserByEmail = async function (email) {
  let connection;
  try {
    connection = await pool.getConnection(async (conn) => conn);
    const selectUserByEmailQuery =
      "SELECT * FROM users WHERE email = ?";
    const selectUserByEmailParams = [email];

    const [row] = await connection.query(selectUserByEmailQuery, selectUserByEmailParams);
    return row;

  } catch (err) {
    console.error(` #### selectUserByEmail Query/DB error #### \n ${err}`);
    return false;
  } finally {
    if (connection) connection.release();
  }
};

// 이메일과 비밀번호로 사용자 조회
exports.selectUser = async function (email, password) {
  let connection;
  try {
    connection = await pool.getConnection(async (conn) => conn);
    const selectUserQuery =
      "SELECT * FROM users WHERE email = ? AND password = ?;";
    const selectUserParams = [email, password];

    const [row] = await connection.query(selectUserQuery, selectUserParams);
    return row;

  } catch (err) {
    console.error(` #### selectUser Query/DB error #### \n ${err}`);
    return false;
  } finally {
    if (connection) connection.release();
  }
};
