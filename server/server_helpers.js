let jwt = require('jsonwebtoken')
const server_config = require('./server_config')

module.exports.checkAuthorization = async function(req) {
  var bearerHeader = req.headers["authorization"]
  if(typeof bearerHeader !== 'undefined') {
   const bearer = bearerHeader.split(" ")
   const bearerToken = bearer[1]

   try {
     if (jwt.verify(bearerToken, server_config.secret)) {
       return jwt.decode(bearerToken)
     } else {
       return false
     }
     
   } catch (ex) {
     return false
   }
 } else {
   return false
  }
}
