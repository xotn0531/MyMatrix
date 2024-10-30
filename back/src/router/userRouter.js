const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const jwtMiddleware = require('../jwtMiddleware').jwtMiddleware;

// 회원가입 API
router.post("/signup", userController.signup);
// 로그인 API
router.post("/signin", userController.signin);

module.exports = router;
