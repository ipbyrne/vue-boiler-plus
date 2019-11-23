const server_config = require('../../server_config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10
const nodemailer = require("nodemailer");
const fs = require('fs')
const Account = require('./accounts-model');

let accounts_controller = {
    readHTMLFile: async function (path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    },
    createToken: async function (req) {
        let account = await Account.findOne({
          email: req.body.email
        }, function (err, account) {
          if (err) throw err
        })
      
        if (!account) {
          return { success: false, message: 'Authentication failed. Account not found.' }
        } else if (account) {
      
          let password_check = account.is_encrypted ? bcrypt.compareSync(req.body.password, account.password) : req.body.password === account.password;
          if (!password_check) {
            return { success: false, message: 'Authentication failed. Wrong password.' }
          } else {
            const payload = {
              id: account.id
            }
            var token = jwt.sign(payload, server_config.secret, { // change with config variable
              expiresIn: server_config.token_expiration
            })
      
            return {
              success: true,
              message: 'Enjoy your token!',
              token: token
            }
          }
        }
    },
    validateUserData: async function (req, res) {
        let email = req.body.email
        let password = req.body.password
        let firstname = req.body.firstname
        let lastname = req.body.lastname
    
        // Validate inputs
        if (firstname == "") {
          res.json({success: false, message: 'First Name is required.'})
          return false;
        }
        if (lastname == "") {
          res.json({success: false, message: 'Last Name is required.'})
          return false;
        }
        if (email == "") {
          res.json({success: false, message: 'Email is required.'})
          return false;
        } else {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(email).toLowerCase()) == false) {
              res.json({success: false, message: 'Valid email is required.'})
              return false;
            } else {
              let account = await Account.findOne({
                email: req.body.email
              }, function (err, account) {
                if (err) throw err
              })
    
              if (account) {
                res.json({ success: false, message: 'Email is already in use.' })
                return false;
              }
            }
        }
        if (password == "") {
          res.json({success: false, message: 'Password is required.'})
          return false;
        }
        return true;
    },
    createUser: async function (req) {
        let email = req.body.email
        let password = req.body.password
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        
        // Create Account
        let account = new Account;
        account.firstname = firstname
        account.lastname = lastname
        account.email = email
        account.password = password
        account.is_encrypted = false
        account.created_at = Date.now
      
        // Salt password
        // Insert into DB
        // Return Token
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);
        // Store hash in your password DB.
        account.password = hash
        account.is_encrypted = true
        
        await account.save()
        
        return true
    },
    validateUserDataUpdate: async function (req, res) {
        let email = req.body.email
        let password = req.body.password
        let firstname = req.body.firstname
        let lastname = req.body.lastname
    
        // Validate inputs
        if (firstname == "") {
          res.json({success: false, message: 'First Name is required.'})
          return false;
        }
        if (lastname == "") {
          res.json({success: false, message: 'Last Name is required.'})
          return false;
        }
        if (email == "") {
          res.json({success: false, message: 'Email is required.'})
          return false;
        } else {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(email).toLowerCase()) == false) {
              res.json({success: false, message: 'Valid email is required.'})
              return false;
            } else {
              if (await this.validateEmailIsNotInUse(email) == false) {
                res.json({success: false, message: 'Email is in use.'})
                return false;
              }
            }
        }
        return true;
    },
    validateEmailIsNotInUse: async function (email) {
        let is_valid = await Account.findOne({
          email: email
        }, function (err, account) {
          if (err) return false
          return true
        })
        return is_valid;
    },
    updateUser: async function (req, id) {
        let email = req.body.email
        let password = req.body.password
        let firstname = req.body.firstname
        let lastname = req.body.lastname
      
        // Update Account
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);
        if (password != "") {
          await Account.updateOne({_id: id}, {
            firstname: firstname,
            lastname: lastname,
            email: email, 
            password: hash
          }, function(err, numberAffected, account) {
            return false
          })
        } else {
          await Account.updateOne({_id: id}, {
            firstname: firstname,
            lastname: lastname,
            email: email
          }, function(err, numberAffected, rawResponse) {
            return false
          })
        }
      
        return true
    },
    sendRegistrationEmail: async function (account) {
        let email = account.email
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
      
        let template_path = '../../emails/welcome.html';
      
        // send mail with defined transport object
        await this.readHTMLFile(template_path, async function(err, html) {
           let info = await transporter.sendMail({
            from: server_config.default_server_email, 
            to: email,
            subject: "Welcome! :)",
            html: html
          });
          console.log("Message sent: %s", info.messageId);
        });
    }
}

module.exports = accounts_controller;















