const ProductModel = require('../../models/ProductModel')
const ProductService = {
    getList:async({ _id }) => {
    return _id ? ProductModel.find({ _id },['title', 'introduction','detail','cover' ]) : ProductModel.find({},['title', 'introduction','detail','cover', 'editTime' ])
  },
}

module.exports = ProductService
