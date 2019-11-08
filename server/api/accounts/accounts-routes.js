const server_helpers = require('../../server_helpers')
const accounts_controller = require('./accounts-controller');

module.exports = function (app) {
  app.post('/api/user/register', async (req, res) => {
    try {
      // Validate inputs
      let inputs_are_valid = await accounts_controller.validateUserData(req, res)

      if (inputs_are_valid) {
        let user_created = await accounts_controller.createUser(req)

        if (user_created) {
          accounts_controller.sendRegistrationEmail(req.body)
          let token = await accounts_controller.createToken(req)
          return res.json(token)
        } else {
          res.json({success: false, message: "Failed to create user."})
        }
      }
    } catch(ex) {
      console.log(ex)
      return res.json({success: false, message: "An unknown error has occured"})
    }
    
  })

  app.post('/api/user/authenticate', async (req, res) => {
    try {
      let token = await accounts_controller.createToken(req)
      return res.json(token)
    } catch(ex) {
      console.log(ex)
      return res.json({success: false, message: "An unknown error has occured"})
    }
    
  })

  app.post('/api/user/update', async (req, res) => {
    try {
      let validate_requestor = await server_helpers.checkAuthorization(req)

      if (validate_requestor) {
        // Validate inputs
        let inputs_are_valid = await accounts_controller.validateUserDataUpdate(req, res)

        if (inputs_are_valid) {
          let user_id = validate_requestor.id
          let user_updated = await accounts_controller.updateUser(req, user_id)

          if (user_updated) {
            return res.json({success: true, message: "User Updated"})
          } else {
            res.json({success: false, message: "Failed to update user."})
          }
        }
      } else {
        res.json({success: false, message: "Unauthorized Request"})
      }
    } catch(ex) {
      console.log(ex)
      return res.json({success: false, message: "An unknown error has occured"})
    }
  })

  app.post('/api/user/check-auth', async (req, res) => {
    try {
      let authenticated = await server_helpers.checkAuthorization(req)
      if (!authenticated) {
        return res.json({success: false, message: "Token is not valid."})
      } else {
        let user = await User.findOne({_id: authenticated.id})
        return res.json({success: true, message: "Token is valid.", user})
      }
    } catch(ex) {
      console.log(ex)
      return res.json({success: false, message: "An unknown error has occured"})
    }
  })

  app.post('/api/user/check-email', async (req, res) => {
    try {
      let email_check = await accounts_controller.validateEmailIsNotInUse(req.body.email);
      res.json({success: email_check, message: "Email is not in use."})
    } catch(ex) {
      console.log(ex)
      return res.json({success: false, message: "An unknown error has occured"})
    }
  })
}
