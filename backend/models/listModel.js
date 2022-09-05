const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
      title: {
        type: String,
        required: [true, 'Please enter username'],
        unique: true
      },
      type: {
        type: String,
      },
      genre: {
        type: String,
      },
      content: {
        type: Array
      }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Lists', listSchema)