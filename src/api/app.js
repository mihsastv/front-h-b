const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const carsRoutes = require('./routes/cars')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
}


//mongoose.connect('mongodb://localhost/htest',
mongoose.connect('mongodb+srv://admin:1qaz1qaz@cluster0-wzuxj.mongodb.net/htest',
    {useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true})
  .then(()=>console.log('Mongo Connect'))
  .catch(error => console.log(error))

app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/cars', carsRoutes)

module.exports = app
