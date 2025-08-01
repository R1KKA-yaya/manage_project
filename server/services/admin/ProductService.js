const ProductModel = require('../../models/ProductModel')
const ProductService = {
  add:async({ title, introduction, detail, cover, editTime }) => {
    return ProductModel.create({
      title, introduction, detail, cover, editTime
    })
  },
  getList:async({ _id }) => {
    return _id ? ProductModel.find({ _id },['title', 'introduction','detail','cover' ]) : ProductModel.find({},['title', 'introduction','cover', 'editTime' ])
  },
  updateList:async({ _id, title, introduction, detail, cover, editTime }) => {
    if(cover){
      return ProductModel.updateOne({
              _id
          },{
              title, introduction, detail, cover, editTime
          })
      }
      else{
      return ProductModel.updateOne({
              _id
          },{
              title, introduction, detail, editTime
          })
    }
  },
  delList:async({ _id }) => {
    return ProductModel.deleteOne({ _id })
  }
}

module.exports = ProductService