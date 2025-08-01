const NewsService = require('../../services/web/NewsService')

const NewsController = {
  getList:async (req,res) => {
    const data = await NewsService.getList({_id:req.params.id})
    res.send({
      ActionType:'OK',
      data
    })
  },
  getTopList:async (req,res) => {
    const data = await NewsService.getTopList({limit:req.query.limit})
    res.send({
      ActionType:'OK',
      data
    })
  }
}

module.exports = NewsController