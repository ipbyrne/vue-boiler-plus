const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
  email: {
    type: String,
    required: true
  },
  reset_token: {
    type: String,
    required: true
  },
  expiration: {
    type: Date,
    default: Date.now
  }
})
schema.set('toJSON', { virtuals: true })
module.exports =  mongoose.model('ResetToken', schema)