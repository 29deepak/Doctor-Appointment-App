const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const auth = require("../middleware/auth");
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post("/getuserData", auth, userController.authController)


router.post('/book-appointment', auth, userController.bookAppointment)
router.post('/booking-availability', auth, userController.bookingAvailability)

router.post('/user-appointment', auth, userController.userAppointment)


module.exports = router
