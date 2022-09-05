const express = require("express")
const app = express()

const dotenv = require('dotenv').config()
const connectionDB = require('./config/db')
const PORT = process.env.PORT || 5000

connectionDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use('/api/users', require('./routes/userRoute'))
app.use('/api/movies', require('./routes/movieRoute'))

app.listen(PORT, () => console.log(`server started on port ${PORT}`))