const server_config = require('../../server_config')
const nodemailer = require("nodemailer");

let utilities_controller = {
    sendEmail: async function (req) {
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
}
module.exports = utilities_controller;