const http = require("http")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const sequelize = require("./utils/database")
const User = require('./modals/user')
const Doctor = require('./modals/doctor')
const Appointment = require('./modals/appointment')
const userRoutes = require("./routes/user")
const doctorRoutes = require('./routes/doctor')
const adminRoutes = require("./routes/adminRoute")
const doctorRoutes1 = require("./routes/doctorRoute")

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(userRoutes)
app.use(doctorRoutes)
app.use(adminRoutes)
app.use(doctorRoutes1)
app.use(User)
app.use(Doctor)
app.use(Appointment)
const server = http.createServer(app).listen(4000)
sequelize
    .sync()
    .then(() => {
        server
        console.log("connected successfully")

    }).catch((err) => {
        console.log(err)
    })