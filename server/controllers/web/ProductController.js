const ProductService = require('../../services/web/ProductService')

const ProductController = {
  getList:async (req,res) => {
    const data = await ProductService.getList({_id:req.params.id})
    res.send({
      ActionType:'OK',
      data
    })
  },
}

module.exports = ProductController