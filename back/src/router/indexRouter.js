const jwtMiddleware = require('../jwtMiddleware').jwtMiddleware;
const indexController = require('../controller/indexController');

exports.indexRouter = function (app) {
    // 일기 CRUD API
    app.post("/diary", indexController.createDiary); // create
    app.get("/diarys", indexController.readDiary);   // read
};
