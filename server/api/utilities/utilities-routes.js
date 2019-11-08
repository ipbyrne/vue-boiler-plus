const utilities_controller = require("./utilities-controller");

module.exports = function (app) {
    app.post('/api/utilities/send-email', async (req, res) => {
      try {
        // Validate inputs
        let response = await utilities_controller.sendEmail(req)

        if(response) {
          res.json({success: true, message: "Message sent!"})
        } else {
          res.json({success: false, message: "Failed to send message."})
        }
      } catch(ex) {
        console.log(ex)
        return res.json({success: false, message: "An unknown error has occured"})
      }
    })
  }