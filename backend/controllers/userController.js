const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userModule')

// @desc   Register a new user
// @route  /api/users
// @access public

//register
const registerUser = asyncHandler(async(req, res) => {

    const { username, email, password } = req.body

    //validation
    if(!username || !email || !password ) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    //existing user
    const existingUser = await User.findOne({email})

    if(existingUser) {
        res.status(400)
        throw new Error('User already exist')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create users
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

   if(user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)

      })
   }

    return res.status(400)
    throw new Error('Invalid user')
    res.send('Register Route')

})

//@desc Get all Users
//@route GET/api/users
//@access private

//Get users
const getUsers = asyncHandler(async(req, res) => {
   const query = req.query.new

   //get users using the id in the JWT
   if(req.user.isAdmin) {
    const usersCredential = query ? await User.find().limit(2) : await User.find()

    res.status(200).json(usersCredential)

   } else {
      res.status(401)
      throw new Error('Invalid Credentials')
   }
})

//Get user Stats
const getUserStats = asyncHandler(async(req, res) => {
     const today = new Date()
     const lastYear = today.setFullYear(today.setFullYear() - 1)

     const monthArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
     ]
       const data = await User.aggregate([
        {
             $project: {
                month: {$month: "$createdAt"},
             },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                 },
            },
             
       ])
           res.status(200).json(data)

           return res.status(400)
           throw new Error(`can't find data`)
})


//@desc Update user
//@route PUT/api/users:id
//@access private

//update user route
const updateUser = asyncHandler(async(req, res) => {
     //get the user id from JWT
     const { password, username, email } = req.body
     const user = await User.findById(req.user.id)

     if(!user) {
        res.status(401)

        throw new Error('Not Authorized')
     }

       const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
      if(req.user.id === req.params.id || req.user.isAdmin) {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {password:hashedPassword, username, email} , { new: true })

        res.status(200).json(updatedUser)

      }

})

//@desc Delete user
//@route DELETE/api/users:id
//@access private

//Delete user
const deleteUser = asyncHandler(async(req, res) => {
   //get user id from JWT
   const user = await User.findById(req.user.id)

   if(!user) {
      res.status(401)
      throw new Error('Not Authorized')
   }

   if(req.user.id === req.params.id || req.user.isAdmin) {
    await user.remove()
     res.status(200).json({ success: true })
   }
  
})



//@desc Login user
//@route /api/users/login
//@access public

//Login
const loginUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body

    const user = await User.findOne({ email })

    //check if user and password match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),

        })

    }
    else {
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})


//Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserStats,
}