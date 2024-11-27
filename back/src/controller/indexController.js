const indexDao = require("../dao/indexDao");

// 일기 생성
exports.createDiary = async function (req, res) {
  try {
    const { userId, emotionStatus = "보통", emotionScore, content } = req.body;

    // 입력값 검증
    if (!userId || !content || !emotionStatus) {
      return res.status(400).send({
        isSuccess: false,
        code: 400,
        message: "입력값이 누락되었습니다.",
      });
    }

    // 감정 점수를 개별 변수로 추출
    const 보통 = emotionScore?.보통 || 0;
    const 행복 = emotionScore?.행복 || 0;
    const 슬픔 = emotionScore?.슬픔 || 0;
    const 화남 = emotionScore?.화남 || 0;

    // DB에 저장
    const insertDiaryRow = await indexDao.insertDiary(
      userId,
      보통,
      행복,
      슬픔,
      화남,
      emotionStatus,
      content
    );

    if (!insertDiaryRow) {
      return res.status(500).send({
        isSuccess: false,
        code: 500,
        message: "데이터 저장 실패",
      });
    }
    console.log(`User ID: ${userId} - 일기 입력 완료`);
    return res.status(200).send({
      isSuccess: true,
      code: 200,
      message: "입력 완료",
    });
  } catch (error) {
    console.error("Error in createDiary:", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "서버 에러가 발생했습니다.",
    });
  }
};

// 일기 조회
exports.readDiary = async function (req, res) {
  try {
    const { userId } = req.verifiedToken;
    const date = req.query.date || new Date().toISOString().split("T")[0];

    // DB에서 일기 조회
    const selectDiaryByDateRows = await indexDao.selectDiaryByDate(userId, date);

    if (!selectDiaryByDateRows || selectDiaryByDateRows.length === 0) {
      return res.status(404).send({
        isSuccess: false,
        code: 404,
        message: "조회된 데이터가 없습니다.",
      });
    }
    console.log(`User ID: ${userId} - 일기 조회 완료`);
    // 감정 점수를 JSON 형태로 변환
    const formattedData = selectDiaryByDateRows.map((row) => ({
      ...row,
      emotionScore: {
        보통: row.보통,
        행복: row.행복,
        슬픔: row.슬픔,
        화남: row.화남,
      },
    }));

    return res.status(200).send({
      isSuccess: true,
      code: 200,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error in readDiary:", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "서버 에러가 발생했습니다.",
    });
  }
};
