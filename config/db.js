const mongoose = require('mongoose')

const connectDB = async () => {
  try {
   await mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true
  })
  console.log('Mongoose connected')
  } catch (err) {
    console.error(err.message)
  process.exit(1)
  }
}

module.exports = connectDB