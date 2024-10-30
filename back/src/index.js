console.log("compression:", require.resolve("compression"));
console.log("cors:", require.resolve("cors"));
console.log("indexRouter:", require.resolve("./router/indexRouter"));
console.log("userRouter:", require.resolve("./router/userRouter"));
console.log("express:", require.resolve("express"));

try {
  const compression = require("compression");
  const cors = require("cors");
  const express = require("express");
  const fs = require("fs");
  const https = require('https')  
  const path = require('path')
  const { indexRouter } = require("./router/indexRouter");
  const { userRouter } = require("./router/userRouter");
  const bodyParser = require("body-parser");

  const app = express();
  const port = 3000;

  const corsOptions = {
    origin: '*', // 모든 도메인 허용
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 허용할 HTTP 메소드
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  
  // 미들웨어 설정
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());

  // 라우터 설정
  indexRouter(app);
  userRouter(app);

  // 서버 시작
  app.listen(port, () => {
    console.log(`Express app listening at port: ${port}`);
  });
  
} catch (error) {
  console.error("Failed to start the server:", error);
}
