const express = require('express')
const router = express.Router()
const doctorRouteController = require("../controllers/doctorRoute")
const auth = require("../middleware/auth");

router.post("/getDoctorInfo", auth, doctorRouteController.getDoctorInfo)
router.post('/updateProfile', auth, doctorRouteController.updateProfile)

router.post('/getDoctorById', auth, doctorRouteController.getDoctorById)

router.post('/doctor-appointment', auth, doctorRouteController.doctorAppointment)

router.post('/updateStatus', auth, doctorRouteController.updateStatusController)
module.exports = router