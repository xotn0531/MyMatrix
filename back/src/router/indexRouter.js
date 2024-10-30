const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../jwtMiddleware').jwtMiddleware;
const indexController = require('../controller/indexController');

// CRUD API
router.post("/diary", jwtMiddleware, indexController.createDiary); // create
router.get("/diarys", jwtMiddleware, indexController.readDiary); // read

module.exports = router;
