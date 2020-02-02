const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carscalendar = new Schema ({
    idCar: {
        type: String,
        required: true,
    },
    dateFrom: {
        type: Date,
        required: true,
    },
    dateTo: {
        type: Date,
        required: true,
    }

})

module.exports = mongoose.model('carcalendar', carscalendar)
