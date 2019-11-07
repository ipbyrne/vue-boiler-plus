const server_config = require('../server_config')
const nodemailer = require("nodemailer");

/* Helper Functions */
async function sendEmail(req) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: server_config.smtp_server,
    port: server_config.smpt_port,
    secure: true, // true for 465, false for other ports
    auth: {
      user: server_config.smtp_user, // generated ethereal user
      pass: server_config.smtp_password// generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: req.body.email, 
    to: server_config.default_server_email,
    subject: req.body.subject,
    text: req.body.message
  });

  console.log("Message sent: %s", info.messageId);

  return true
}

module.exports = function (app) {
    app.post('/api/utilities/send-email', async (req, res) => {
      try {
        // Validate inputs
        let email_sent = await sendEmail(req)

        if(email_sent) {
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