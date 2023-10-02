const express = require('express')
require('dotenv').config();

const app = express()
const connectDB =require('./config/db')

// db 
connectDB();

// bodyparser
app.use(express.json({ extended : false}))

const PORT = process.env.PORT || 6000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

app.get('/', (req,res) => res.json({ msg: 'Welcome to api...'}))

// routes
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))