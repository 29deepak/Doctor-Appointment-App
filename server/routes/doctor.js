const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctor')
const auth = require("../middleware/auth");
router.post('/apply-doctor', auth, doctorController.applyDoctor)

router.post("/get-all-notification", auth, doctorController.getAllNotifications)
router.post("/delete-all-notification", auth, doctorController.deleteAllNotifications)
router.get('/getAllDoctor', auth, doctorController.getAllDoctor)
module.exports = router