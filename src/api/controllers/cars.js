const Cars = require('../models/Cars')
const CarsCalendar = require('../models/CarCalendar')



module.exports.allCars = async function (req, res) {
    const car = await Cars.find()
    res.status(200).json(car);
}

module.exports.carCalendar = async function (req, res) {
    const calendar = await CarsCalendar.find({"idCar": req.params.id})
    res.status(200).json(calendar);
}

module.exports.Booking = async function (req, res) {
       const ext = await CarsCalendar.findOne({$and: [{"idCar": req.params.id},
                                                      {$or: [
                                                               {$and: [
                                                                       {"dateFrom" : {$lte : new Date(req.body.dateFrom)}},
                                                                       {"dateTo" : {$gte : new Date(req.body.dateFrom)}}
                                                                   ]},
                                                               {$and: [
                                                                       {"dateFrom" : {$lte : new Date(req.body.dateTo)}},
                                                                       {"dateTo" : {$gte : new Date(req.body.dateTo)}}
                                                                   ]}
                                                       ]}
                                               ]})
    if (ext) {
        res.status(409).json({
            error: 'period is busy',
            ext: ext})
    } else {
        try {
            await CarsCalendar.insertMany([{"idCar": req.params.id, "dateFrom": new Date(req.body.dateFrom), "dateTo": new Date(req.body.dateTo)}])
                .then(e => res.status(202).json(e))
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message ? err.message : err
            })
        }
    }
}

module.exports.unBooking = async function (req, res) {
    console.log(req.params.id)
   try {
          const rez = await CarsCalendar.findByIdAndDelete(req.params.id)
          res.status(200).json(rez)
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message ? err.message : err
        })

    }

}

module.exports.addCar = async function (req, res) {
    const can = await Cars.findOne({"license": req.body.license})
    if (can) {
        res.status(409).json({car: can,
        error: 'car exist'});
    } else
    {
        try {
            await Cars.insertMany([{"model": req.body.model, "license": req.body.license}])
                .then(e =>{res.status(201).json(e)})
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message ? err.message : err
            })
        }
    }
}



