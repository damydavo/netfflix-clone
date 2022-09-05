const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const Movie = require('../models/movieModule')
const User = require('../models/userModule')


// @desc   Create movie
// @route  POST/api/create
// @access private

const createMovie = asyncHandler(async(req, res) => {
    const { title, description, img, imgTitle, imgSmall, trailer, video, year, limit, genre, isSeries } = req.body

    if(!title || !description || !img || !imgTitle) {
        res.status(400)
        throw new Error("All fields must be added")
    }

    //Get user using the id in the JWT
    const user = await User.findById(req.user.id)
     if(!user) {
        res.status(401)
        throw new Error('User not found')
     }

     const newMovie = await Movie.create({
        title,
        description,
        img, 
        imgTitle,
        imgSmall,
        trailer,
        video,
        year,
        limit,
        genre,
        isSeries
     })
     res.status(201).json(newMovie)
})

// @desc   Update movie
// @route  POST/api/movies:id
// @access private

const updateMovies= asyncHandler(async(req, res) => {
      //get user using the id in the JWT
      const user = await User.findById(req.user.id)

      if(!user) {
        res.status(401)
        throw new Error('User not found')
      }

      const movies = await Movie.findById(req.params.id)
      
     if(!movies) {
        res.status(401)
        throw new Error('Movie not found')
     }

     if(movies.user.toString() !== req.user.isAdmin) {
        res.status(401)
        throw new Error('Not authorized')
     }
      
     const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })

     res.status(200).json(updatedMovie)

})

// @desc   Delete movie
// @route  DELETE/api/movies:id
// @access private

const deleteMovie = asyncHandler(async(req, res) => {
    //get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if(req.user.isAdmin) {
        await Movie.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true })
    }

    res.status(401)
    throw new Error('Not Authorized')

})

// @desc   Get user ticket
// @route  GET/api/tickets:id
// @access private

const getMovie = asyncHandler(async(req, res) => {
    //get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not Found')
    }

    if(req.user.isAdmin) {
        const movies = await Movie.find()

        res.status(200).json(movies)

    }

    res.status(401)
    throw new Error('there is no movies')
})

module.exports = {
    createMovie,
    updateMovies,
    deleteMovie,
    getMovie,
}