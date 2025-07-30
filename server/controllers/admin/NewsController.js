const NewsService = require('../../services/admin/NewsService')

const NewsController = {
  add:async (req,res) => {
    const { title, content, category, isPublish, author } = req.body
    const cover = req.file?`newsuploads/${req.file.filename}`:''
    await NewsService.add({
      author,
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
    const { author } = req.query
    const data = await NewsService.getList({_id:req.params.id,author})
    res.send({
      ActionType:'OK',
      data
    })
  },
  updateList:async (req, res) => {
    const { _id ,title, content, category,isPublish } = req.body
    const cover = req.file?`newsuploads/${req.file.filename}`:''
    await NewsService.updateList({
      _id,
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
  publish:async (req,res) => {
    const { _id, isPublish } = req.body
    await NewsService.publish({ _id, isPublish, editTime:new Date() })
    res.send({
      ActionType:'OK'
    })
  },
  delList:async (req,res) => {
    const _id = req.params.id
    await NewsService.delList({_id})
    res.send({
      ActionType:'OK'
    })
  }
}

module.exports = NewsController