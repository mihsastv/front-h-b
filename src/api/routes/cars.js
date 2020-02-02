const express = require('express')
const router = express.Router()
const controller = require('../controllers/cars')

router.delete('/unbooking/:id', controller.unBooking);
router.get('/', controller.allCars);
router.get('/:id', controller.carCalendar);
router.post('/booking/:id', controller.Booking);
router.post('/addcar', controller.addCar);



module.exports = router
