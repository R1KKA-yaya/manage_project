var express = require('express');
var NewsRouter = express.Router();
const NewsController = require('../../controllers/admin/NewsController')
const multer = require('multer')
const upload = multer({ dest:'public/newsuploads/'})

NewsRouter.get('/adminapi/news/list',NewsController.getList)
NewsRouter.post('/adminapi/news/add',upload.single('file'),NewsController.add)
NewsRouter.put('/adminapi/news/publish',NewsController.publish)

module.exports = NewsRouter;