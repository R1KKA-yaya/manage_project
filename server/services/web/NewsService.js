const NewsModel = require('../../models/NewsModel')
const NewsService = {
  getList:async({_id}) => {
    return _id ? NewsModel.find({_id,isPublish: 1},['title','category','isPublish','cover','content','editTime']):NewsModel.find({isPublish: 1},['title','category','isPublish','editTime','content','cover']).sort({ editTime: -1 })
  },
  getTopList:async ({limit}) => {
    return NewsModel.find({isPublish: 1},['title','category','isPublish','editTime','content','cover']).sort({ editTime: -1 }).limit(limit)
  }
}

module.exports = NewsService