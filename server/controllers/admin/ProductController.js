const ProductService = require('../../services/admin/ProductService')

const ProductController = {
  add:async (req,res) => {
    const { title, introduction, detail } = req.body
    const cover = req.file?`productuploads/${req.file.filename}`:''
    await ProductService.add({
      title, introduction, detail, cover,
      editTime:new Date()
    })
    res.send({
      ActionType:'OK'
    })
  },
  getList:async (req,res) => {
    const data = await ProductService.getList({_id:req.params.id})
    res.send({
      ActionType:'OK',
      data
    })
  },
  delList:async (req, res) => {
    const _id = req.params.id
    await ProductService.delList({ _id })
    res.send({
      ActionType:'OK'
    })
  },
  updateList:async (req, res) => {
    const { _id, title, introduction, detail } = req.body
    const cover = req.file?`productuploads/${req.file.filename}`:''
    await ProductService.updateList({
      _id,
      title,
      introduction,
      detail,
      cover,
      editTime:new Date()
    })
    res.send({
      ActionType:'OK'
    })
  }
}

module.exports = ProductController