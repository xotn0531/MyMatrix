const userDao = require("../dao/userDao");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../secret");

// email, password, nickname, hwId
exports.signup = async function (req, res) {
  const { email, password, nickname, hwId } = req.body;

  if (!email || !password || !nickname || !hwId) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "회원 가입 입력 값을 확인해주세요.",
    });
  }

  const isVaildEmail =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  if (!isVaildEmail.test(email)) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "이메일 형식을 확인해주세요.",
    });
  }

  const isVaildPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/; // 8~20 영문 숫자 조합
  if (!isVaildPassword.test(password)) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "비밀번호 형식을 확인해주세요",
    });
  }

  if (nickname.length < 2 || nickname.length > 20) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "닉네임 형식을 확인해주세요. 2~20 글자",
    });
  }

  // 중복 검사
  const isDuplicatedEmail = await userDao.selectUserByEmail(email);
  if (isDuplicatedEmail.length > 0) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "이미 가입된 회원입니다.",
    });
  }

  // DB 입력
  const insertUserRow = await userDao.insertUser(
    email,
    password,  // 해싱 없이 저장
    nickname,
    hwId
  );

  if (!insertUserRow) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "회원가입 실패, 관리자에게 문의 해주세요",
    });
  }

  return res.send({
    isSuccess: true,
    code: 200,
    message: "회원가입 성공",
  });
};

exports.signin = async function (req, res) {
  const {email, password} = req.body;

  // 회원 정보 확인
  if (!email || !password) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "회원 정보를 입력해주세요.",
    });
  }

  // 회원 여부 검사
  const isVaildUser = await userDao.selectUser(email, password)
  
  // DB ERROR
  if(!isVaildUser){
    return res.send({
        isSuccess:false,
        code :400,
        message: "DB 에러, 담당자에게 문의해주세요."
    })
  }

  // ID,PW 불일치
  if(isVaildUser.length < 1){
    return res.send({
        isSuccess:false,
        code :400,
        message: "아이디와 비밀번호를 확인해주세요."
    })
  }

  const [userInfo] = isVaildUser
  const userId = userInfo.userId;
  console.log(`User ID: ${userId} 로그인 완료`);

  // jwt 발급
  const token = jwt.sign(
    {userId:userId},         //  페이로드
    jwtSecret   //  시크릿 키 
  );

  return res.send({
    result: {token:token},
    isSuccess:true,
    code:200,
    message:"로그인 성공",
  });
};
