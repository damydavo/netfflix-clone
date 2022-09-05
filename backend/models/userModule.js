const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
      username: {
        type: String,
        required: [true, 'Please enter username'],
        unique: true
      },
      email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
      },
      password: {
        type: String,
        required: [true, 'Please enter your password'],
      },
     profilePic: {
        type: String,
        default: false       
     },
     isAdmin: {
        type: Boolean, 
        default: false
     },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Users', userSchema)