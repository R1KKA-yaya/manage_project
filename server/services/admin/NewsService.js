const NewsModel = require('../../models/NewsModel')
const NewsService = {
  add:async({ author,title, content, category, isPublish, cover, editTime }) => {
    return NewsModel.create({
      author,title,content,category,isPublish,cover,editTime
    })
  },
  getList:async({_id,author}) => {
    return _id ? NewsModel.find({_id,author},['title','category','isPublish','cover','content']):NewsModel.find({author},['title','category','isPublish','editTime','content'])
  },
  updateList:async({ _id, title, content, category, isPublish, cover, editTime }) => {
    if(cover){
      return NewsModel.updateOne({
              _id
          },{
              title, content, category, isPublish, cover, editTime
          })
      }
      else{
      return NewsModel.updateOne({
              _id
          },{
              title, content, category, isPublish, editTime
          })
    }
  },
  publish:async({_id, isPublish, editTime}) => {
    return NewsModel.updateOne({ _id },{
      isPublish,
      editTime
    })
  },
  delList:async({ _id }) => {
    return NewsModel.deleteOne({ _id })
  }
}

module.exports = NewsService