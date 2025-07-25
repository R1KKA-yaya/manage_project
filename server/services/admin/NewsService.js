const NewsModel = require('../../models/NewsModel')
const NewsService = {
  add:async({title,content,category, isPublish,cover,editTime}) => {
    return NewsModel.create({
      title,content,category,isPublish,cover,editTime
    })
  },
  getList:async() => {
    return NewsModel.find({},['title','category','isPublish','editTime'])
  }
}

module.exports = NewsService