const fs = require("fs");
const https = require('https');
const path = require('path');
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const indexRouter = require("./router/indexRouter"); // indexRouter 함수 전체를 가져옴
const userRouter = require("./router/userRouter"); // userRouter 함수 전체를 가져옴

// 앱 생성
const app = express();
const port = 3000;

// CORS 옵션 설정
const corsOptions = {
  origin: '*', // 모든 도메인 허용
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 허용할 HTTP 메소드
  allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// 미들웨어 설정
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

// 라우터 설정
app.use('/', indexRouter); // 루트 경로에 indexRouter 설정
app.use('/user', userRouter); // /user 경로에 userRouter 설정

// HTTPS 서버 옵션 설정
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'server.key')),  // SSL 개인 키
  cert: fs.readFileSync(path.join(__dirname, 'server.cert')) // SSL 인증서
};

// HTTPS 서버 생성 및 실행
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`HTTPS Express app listening at https://localhost:${port}`);
});
