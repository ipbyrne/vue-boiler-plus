const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  is_encrypted: {
    type: Boolean,
    required: true,
    default: false
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
})
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Account', schema);