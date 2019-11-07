const server_config = require('../server_config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10
const nodemailer = require("nodemailer");
const fs = require('fs')
const server_helpers = require('../server_helpers')
const User = require('../models/accounts');
const ResetToken = require('../models/reset-tokens');


/* Helper Functions */
async function readHTMLFile(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};

async function createToken(req) {
  let user = await User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err
  })

  if (!user) {
    return { success: false, message: 'Authentication failed. User not found.' }
  } else if (user) {

    let password_check = user.is_encrypted ? bcrypt.compareSync(req.body.password, user.password) : req.body.password === user.password;
    if (!password_check) {
      return { success: false, message: 'Authentication failed. Wrong password.' }
    } else {
      const payload = {
        id: user.id
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
}

async function validateUserData(req, res) {
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
          let user = await User.findOne({
            email: req.body.email
          }, function (err, user) {
            if (err) throw err
          })

          if (user) {
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
}

async function createUser(req) {
  let email = req.body.email
  let password = req.body.password
  let firstname = req.body.firstname
  let lastname = req.body.lastname
  
  // Create User
  let user = new User;
  user.firstname = firstname
  user.lastname = lastname
  user.email = email
  user.password = password
  user.is_encrypted = false
  user.created_at = Date.now

  // Salt password
  // Insert into DB
  // Return Token
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(password, salt);
  // Store hash in your password DB.
  user.password = hash
  user.is_encrypted = true
  
  await user.save()
  
  return true
}

async function validateUserDataUpdate(req, res) {
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
          if (await validateEmailIsNotInUse(email) == false) {
            res.json({success: false, message: 'Email is in use.'})
            return false;
          }
        }
    }
    return true;
}

async function validateEmailIsNotInUse(email) {
  let is_valid = await User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) return false
    return true
  })
  return is_valid;
}

async function updateUser(req, id) {
  let email = req.body.email
  let password = req.body.password
  let firstname = req.body.firstname
  let lastname = req.body.lastname

  // Update User
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(password, salt);
  if (password != "") {
    await User.updateOne({_id: id}, {
      firstname: firstname,
      lastname: lastname,
      email: email, 
      password: hash
    }, function(err, numberAffected, user) {
      return false
    })
  } else {
    await User.updateOne({_id: id}, {
      firstname: firstname,
      lastname: lastname,
      email: email
    }, function(err, numberAffected, rawResponse) {
      return false
    })
  }

  return true
}

async function sendRegistrationEmail(user) {
  let email = user.email
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

  let template_path = './emails/welcome.html';

  // send mail with defined transport object
  await readHTMLFile(template_path, async function(err, html) {
     let info = await transporter.sendMail({
      from: server_config.default_server_email, 
      to: email,
      subject: "Welcome! :)",
      html: html
    });
    console.log("Message sent: %s", info.messageId);
  });
}

async function createResetPasswordToken(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function createResetToken(req) {
  let email = req.body.email

  let user =  await User.findOne({
    email: email
  }, function (err, user) {
    if (err) throw err
  })

  if (user) {
    let reset_token = new ResetToken
    reset_token.email = email
    reset_token.reset_token = await createResetPasswordToken(16)
    await reset_token.save()
    return reset_token.reset_token
  } else {
    return false
  }
}

async function sendResetEmail(req, token) {
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

  let template_path = './emails/reset-password.html';
  template_path = template_path.replace("{{TOKEN}}", token);

  // send mail with defined transport object
  await readHTMLFile(template_path, async function(err, html) {
    let info = await transporter.sendMail({
      from: server_config.default_server_email, 
      to: req.body.email,
      subject: "Reset Password - Vue Boiler Plate",
      html: html
    });
    console.log("Message sent: %s", info.messageId);
  });
}

async function validateResetToken(req, res) {
  let token = req.body.token
  let password = req.body.password

  let reset_token = await ResetToken.findOne({
    reset_token: token
  }, function (err, user) {
    return false
  })

  if (reset_token) {
    current_time = new Date()
    difference = ((current_time.getTime() - reset_token.expiration.getTime()) / 1000);
    if (difference < (60 * 60 * 12 * 1000)) { // 12 Hour Expiry
      // Update User
      var salt = bcrypt.genSaltSync(saltRounds);
      var hash = bcrypt.hashSync(password, salt);

      let update = await User.updateOne({email: reset_token.email}, {
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

module.exports = function (app) {
  app.post('/api/user/register', async (req, res) => {
    try {
      // Validate inputs
      let inputs_are_valid = await validateUserData(req, res)

      if (inputs_are_valid) {
        let user_created = await createUser(req)

        if (user_created) {
          sendRegistrationEmail(req.body)
          let token = await createToken(req)
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
      let token = await createToken(req)
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
        let inputs_are_valid = await validateUserDataUpdate(req, res)

        if (inputs_are_valid) {
          let user_id = validate_requestor.id
          let user_updated = await updateUser(req, user_id)

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

  app.post('/api/user/create-reset-password-token', async (req, res) => {
    try {
      let token_created = await createResetToken(req)
      if(token_created != false) {
        // Send Email
        sendResetEmail(req, token_created)
        return res.json({success: true, message: "Reset token has been created"})
      } else {
        return res.json({success: false, message: "Failed to reset password"})
      }
    } catch(ex) {
      console.log(ex)
      return res.json({success: false, message: "An unknown error has occured"})
    }
  })

  app.post('/api/user/reset-password', async (req, res) => {
    try {
      let token_is_valid = await validateResetToken(req)
      if(token_is_valid) {
        return res.json({success: true, message: "Password reset."})
      } else {
        return res.json({success: false, message: "Failed to reset password"})
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
      let email_check = await validateEmailIsNotInUse(req.body.email);
      res.json({success: email_check, message: "Email is not in use."})
    } catch(ex) {
      console.log(ex)
      return res.json({success: false, message: "An unknown error has occured"})
    }
  })
}
