const mongoose = require('mongoose')

const connectDB = async () => {
  console.log(process.env.mongoURI, 'uri..')
  try {
   await mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('Mongoose connected')
  } catch (err) {
    console.error(err.message)
  process.exit(1)
  }
}

module.exports = connectDB