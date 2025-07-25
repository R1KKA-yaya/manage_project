const NewsService = require('../../services/admin/NewsService')

const NewsController = {
  add:async (req,res) => {
    const { title, content, category,isPublish } = req.body
    const cover = req.file?`newsuploads/${req.file.filename}`:''
    await NewsService.add({
      title,
      content,
      category:Number(category), 
      isPublish:Number(isPublish),
      cover,
      editTime:new Date()
    })
    res.send({
      ActionType:'OK'
    })
  },
  getList:async (req,res) => {
    const data = await NewsService.getList()
    res.send({
      ActionType:'OK',
      data
    })
  },
  publish:async (req,res) => {
    const { _id, isPublish } = req.body
    await NewsService.publish({ _id, isPublish, editTime:new Date() })
    res.send({
      ActionType:'OK'
    })
  }
}

module.exports = NewsController