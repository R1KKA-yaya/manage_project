const jsonwebtoken = require('jsonwebtoken')
const secret = 'xiongrihui'
const JWT = {
  generate(value,exprires){
    return jsonwebtoken.sign(value,secret,{expiresIn:exprires})
  },
  vertify(token){
    try{
        return jsonwebtoken.verify(token,secret)
    }catch(e){
      return false
    }
  }
}

module.exports = JWT