const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carsSchema = new Schema ({
    model: {
        type: String,
        required: true,
    },
    license: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('car', carsSchema)

