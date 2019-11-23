const server_config = require('../../server_config')
const bcrypt = require('bcrypt')
const saltRounds = 10
const nodemailer = require("nodemailer");
const Account = require('../accounts/accounts-model');
const ResetToken = require('./reset-tokens-model');

let reset_token_controller = {
    createResetPasswordToken: async function (length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    createResetToken: async function (req) {
        let email = req.body.email
  
        let account =  await Account.findOne({
        email: email
        }, function (err, account) {
        if (err) throw err
        })
    
        if (account) {
            let reset_token = new ResetToken
            reset_token.email = email
            reset_token.reset_token = await this.createResetPasswordToken(16)
            await reset_token.save()
            let token = reset_token.reset_token
            this.sendResetEmail(req, token)
            return true;
        } else {
            return false
        }
    },
    sendResetEmail: async function (req, token) {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: server_config.smtp_server,
            port: server_config.smpt_port,
            secure: true, // true for 465, false for other ports
            auth: {
            account: server_config.smtp_user, // generated ethereal account
            pass: server_config.smtp_password// generated ethereal password
            }
        });
        
        let template_path = '../../emails/reset-password.html';
        template_path = template_path.replace("{{TOKEN}}", token);
        
        // send mail with defined transport object
        await this.readHTMLFile(template_path, async function(err, html) {
            let info = await transporter.sendMail({
            from: server_config.default_server_email, 
            to: req.body.email,
            subject: "Reset Password - Vue Boiler Plate",
            html: html
            });
            console.log("Message sent: %s", info.messageId);
        });
    },
    validateResetToken: async function (req) {
        let token = req.body.token
        let password = req.body.password
    
        let reset_token = await ResetToken.findOne({
        reset_token: token
        }, function (err, account) {
        return false
        })
    
        if (reset_token) {
        current_time = new Date()
        difference = ((current_time.getTime() - reset_token.expiration.getTime()) / 1000);
        if (difference < (60 * 60 * 12 * 1000)) { // 12 Hour Expiry
            // Update Account
            var salt = bcrypt.genSaltSync(saltRounds);
            var hash = bcrypt.hashSync(password, salt);
    
            let update = await Account.updateOne({email: reset_token.email}, {
            password: hash
            }, function(err) {
            if (err) {
                return false
            } else {
                return true
            }
            
            })
            if (update) {
            await ResetToken.findOneAndDelete({reset_token: token})
            return true
            } else {
            return false
            }
        } else {
            return false
        }
        } else {
        return false
        }
    }
}
module.exports = reset_token_controller;