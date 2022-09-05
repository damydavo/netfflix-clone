const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
      title: {
        type: String,
        required: [true, 'Please enter username'],
        unique: true
      },
      description: {
        type: String,
      },
      img: {
        type: String,
      },
      imgTitle: {
        type: String,
      },
      imgSmall: {
        type: String,
      },
      trailer: {
        type: String,
      },
      video: {
        type: String,
      },
      year: {
        type: String,
      },
      limit: {
        type: Number,
      },
      genre: {
        type: String,
      },
      isSeries: {
        type: Boolean,
        default: false
      }
     
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Movies', movieSchema)