const express = require('express')
const router = express.Router()

const { registerUser, loginUser, updateUser, deleteUser, getUsers, getUserStats } = require('../controllers/userController')

const { protected } = require('../middleware/authMiddleware')


router.route('/').post(registerUser).get(protected, getUsers)
router.get('/stats', getUserStats)
router.post('/login', loginUser)

router.route('/:id').put(protected, updateUser).delete(protected, deleteUser)


module.exports = router