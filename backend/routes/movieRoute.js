const express = require('express')
const router = express()

const { protected } = require('../middleware/authMiddleware')

const { createMovie, updateMovies, getMovie, deleteMovie } = require('../controllers/movieController')

router.route('/').post(protected, createMovie).get(protected, getMovie)

router.route('/:id').put(protected, updateMovies).delete(protected, deleteMovie)

module.exports = router
