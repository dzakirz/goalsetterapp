const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Isi tidak boleh kosong']
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)