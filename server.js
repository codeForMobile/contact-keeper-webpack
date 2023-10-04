const path = require('path')
const express = require('express')
require('dotenv').config();

const app = express()
const connectDB =require('./config/db')

// db 
connectDB();

// bodyparser
app.use(express.json({ extended : false}))

// routes
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

if (process.env.NODE_ENV !=='development') {

    //set static folder
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req,res) => 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
} else {
    app.get('/', (req,res) => res.json({ msg: 'Welcome to api...'}))
}

const PORT = process.env.PORT || 6060
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
