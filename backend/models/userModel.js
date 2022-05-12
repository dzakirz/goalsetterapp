const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Isikan Nama']
  },
  email: {
    type: String,
    required: [true, 'Isikan Email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Isikan Password']
  }
},{
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)