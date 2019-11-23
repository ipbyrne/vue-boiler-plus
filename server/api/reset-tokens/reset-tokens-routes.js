
const reset_token_controller = require('./reset-tokens-controller')

module.exports = function (app) {
    app.post('/api/account/create-reset-password-token', async (req, res) => {
        try {
            let response = await reset_token_controller.createResetToken(req)
            if(response) {
                return res.json({success: true, message: "Reset token has been created"})
            } else {
                return res.json({success: false, message: "Failed to reset password"})
            }
        } catch(ex) {
            console.log(ex)
            return res.json({success: false, message: "An unknown error has occured"})
        }
    })
  
    app.post('/api/account/reset-password', async (req, res) => {
        try {
            let response = await reset_token_controller.validateResetToken(req)
            if(response) {
                return res.json({success: true, message: "Password reset."})
            } else {
                return res.json({success: false, message: "Failed to reset password"})
            }
        } catch(ex) {
            console.log(ex)
            return res.json({success: false, message: "An unknown error has occured"})
        }
    })
  }