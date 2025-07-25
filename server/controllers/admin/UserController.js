const UserService = require('../../services/admin/UserService')
const JWT = require('../../util/JWT')

const UserController = {
  login:async(req,res)=>{
    const result =  await UserService.login(req.body)
    if(result.length===0){
      res.send({
        code:'-1',
        error:'用户名密码不匹配'
      })
    }else{
      // 生成 token
      const token = JWT.generate({
        _id:result[0]._id,
        username:result[0].username
      },'10s')
      res.header('Authorization',token)
      res.send({
        ActionType:'OK',
        data:{
            username:result[0].username,
            gender:result[0].gender?result[0].gender:0, // 0，1，2
            introduction:result[0].introduction, // 简介
            avatar:result[0].avatar,
            role:result[0].role //管理员1，编辑2
        }
      })
    }
  },
  add:async(req,res) => {
    const { username, gender, introduction, role, password } = req.body
    const avatar = req.file?`avataruploads/${req.file.filename}`:''
    await UserService.add({username, gender:Number(gender), introduction, role:Number(role), password, avatar})
    res.send({
      ActionType:'OK'
    })
  },
  upload:async(req,res) => {
    const { username, gender, introduction } = req.body
    const avatar = req.file?`avataruploads/${req.file.filename}`:''
    const token = req.headers['authorization'].split(' ')[1]
    const payload = JWT.vertify(token)
    await UserService.upload({_id:payload._id,username,gender:Number(gender),introduction,avatar})
    if(avatar){
        res.send({
        ActionType:'OK',
        data:{
          username,
          gender:Number(gender),
          introduction,
          avatar
        }
      })
    }else{
       res.send({
        ActionType:'OK',
        data:{
          username,
          gender:Number(gender),
          introduction
        }
      })
    }
  },
  getList:async (req,res) => {
    const {id} = req.params
    const data = await UserService.getList({_id:id})
    res.send({
      ActionType:'OK',
      data
    })
  },
  putList:async (req,res) => {
    const {_id,username, introduction, role, password} = req.body
    await UserService.putList({_id,username, introduction, role, password})
    res.send({
      ActionType:'OK'
    })
  },
  delList:async (req,res) => {
    await UserService.delList({_id:req.params.id})
    res.send({
      ActionType:'OK'
    })
  }
}

module.exports = UserController