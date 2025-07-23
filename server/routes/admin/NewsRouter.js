var express = require('express');
var NewsRouter = express.Router();
const NewsController = require('../../controllers/admin/NewsController')
const multer = require('multer')
const upload = multer({ dest:'public/newsuploads/'})

NewsRouter.post('/adminapi/news/add',upload.single('file'),NewsController.add)

module.exports = NewsRouter;