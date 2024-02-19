const express = require('express')
const router = express.Router()
const adminController = require("../controllers/adminRoute")
const auth = require("../middleware/auth");

router.get("/getAllUsers", auth, adminController.getAllUsers)
router.get("/getAllDoctors", auth, adminController.getAllDoctors)

router.post("/changeAccountStatus", auth, adminController.changeAccountStatus)

module.exports = router