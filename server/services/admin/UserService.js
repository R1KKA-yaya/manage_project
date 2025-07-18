const UserModel = require('../../models/UserModel')
const UserService = {
  login:async({username,password})=>{
    return UserModel.find({
      username,
      password
    })
  },
  upload:async({_id,username,gender,introduction,avatar}) => {
    if(avatar){
      return UserModel.updateOne({
              _id
          },{
              username,gender,introduction,avatar
          })
      }
      else{
      return UserModel.updateOne({
              _id
          },{
              username,gender,introduction
          })
    }
  },
  add:async({username,gender,introduction,avatar,password,role}) => {
    return UserModel.create({
      username,introduction,gender,avatar,password,role
    })
  },
  getList:async() => {
    return UserModel.find({},['username','role','avatar','gender','introduction'])
  },
  delList:async({_id}) => {
    return UserModel.deleteOne({_id})
  }
}

module.exports = UserService