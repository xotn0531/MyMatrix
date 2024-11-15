const indexDao = require("../dao/indexDao");

// 일기 생성
exports.createDiary = async function (req, res) {
  try {
    // 요청 본문에서 필요한 값을 비구조화 할당으로 추출
    const { userId, emotionStatus, emotionScore, content } = req.body;

    // 입력값 검증
    if (!userId || !emotionStatus || !emotionScore || !content === undefined) {
      return res.status(400).send({
        isSuccess: false,
        code: 400,
        message: "입력값이 누락되었습니다.",
      });
    }

    // DB에 일기 저장
    const insertDiaryRow = await indexDao.insertDiary(
      userId,
      emotionStatus,
      emotionScore,
      content
      );

    // 성공적인 응답
    return res.status(200).send({
      isSuccess: true,
      code: 200,
      message: "입력 완료",
    });

  } catch (error) {
    // 에러 발생 시 처리
    console.error("Error in createDiary:", error);
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
    // 객체 비구조화 할당을 사용해 토큰에서 userIdx 추출
    const { userId } = req.verifiedToken;
    const date = req.query.date || new Date().toISOString().split('T')[0]; // 현재 날짜 사용

    // DB에서 일기 조회
    const selectDiaryByDateRows = await indexDao.selectDiaryByDate(userId, date);

    // 조회 결과 반환
    return res.status(200).send({
      isSuccess: true,
      code: 200,
      data: selectDiaryByDateRows,
    });

  } catch (error) {
    // 에러 발생 시 처리
    console.error("Error in readDiary:", error);
    return res.status(500).send({
      isSuccess: false,
      code: 500,
      message: "서버 에러가 발생했습니다.",
    });
  }
};
