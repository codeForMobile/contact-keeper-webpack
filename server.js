const path = require('path')
require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const nocache = require('nocache')
const cors = require('cors')

const app = express()

//  cors config
const CorsOptions = {
    allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'X-auth-token'],
    methods: 'GET,PUT,POST,DELETE',
    preflightContinue: false,
    maxAge: 1800
  }

// helmet stuff
app.use(helmet.dnsPrefetchControl())
app.use(helmet.hidePoweredBy())
app.use(helmet.noSniff())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.xssFilter())
// nocache
app.use(nocache())

// cors fixing
app.use(cors(CorsOptions))

//db connection
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
