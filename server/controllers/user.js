const User = require('../modals/user');
const JWT = require("jsonwebtoken");
const Appointment = require('../modals/appointment')
const moment = require('moment')
const { Op } = require('sequelize');

function Token(id) {
    return JWT.sign({ userId: id }, "deepak", { expiresIn: "1d" })
}
exports.register = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;
        if (name && email && password) {
            const user = await User.create({ name, email, password })
            return res.status(201).json({ msg: "user created sucessfully" })
        }

    } catch (err) {
        return res.status(500).json(err)
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findAll({ where: { email } })

        if (user) {
            if (user[0].password === password) {
                return res.status(200).json({ message: "login success", success: true, token: Token(user[0].id) })
            }
        }
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

exports.authController = async (req, res) => {
    try {
        // console.log("helllo depak", req.user.name)
        // return res.status(200).json(req.user)
        let data = {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            isAdmin: req.user?.isAdmin,
            notification: req.user?.notification,
            seenNotification: req.user?.seenNotification,
            isDoctor: req.user?.isDoctor,
        }
        return res.status(200).json({ success: true, data })

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.bookAppointment = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, "DD-MM_YYYY").toISOString()
        req.body.time = moment(req.body.time, "HH:mm").toISOString()
        req.body.status = "pending"
        // console.log(req.body)
        const newAppointment = await Appointment.create(req.body)
        const user = await User.findOne({ where: { id: req.body.doctorInfo.userid } })
        const notification = user.notification === null ? [] : user.notification
        notification.push({
            type: "New Appointment Request",
            message: ` A new Appointmnet Request from ${req.body.userInfo.name}`,
            onClickPath: "/user/appointment"
        })
        console.log("dbfvnfbvn", notification)
        const updatedUser = await User.update({
            notification: notification
        }, { where: { id: req.body.doctorInfo.userid } })
        return res.status(200).json({
            success: true,
            message: "Appointment Booked Successfully",

        })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.bookingAvailability = async (req, res) => {
    try {
        console.log("dfgbnhgf------------------------------------------------")
        const date = moment(req.body.date, "DD-MM-YYYY").toISOString()
        const fromTime = moment(req.body.time, "HH:mm").subtract(1, 'hours').toISOString()
        const toTime = moment(req.body.time, "HH:mm").add(1, 'hours').toISOString()
        const doctorId = req.body.doctorId
        console.log(req.body)
        const appointment = await Appointment.findAll({
            where: {
                doctorId: doctorId, date: date, time: {
                    [Op.between]: [fromTime, toTime]
                }
            }
        })
        console.log(appointment)
        if (appointment.length > 0) {
            return res.status(200).json({
                success: false,
                message: "Appointments not avaailable at this time"
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Apppointment Available"
            })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.userAppointment = async (req, res) => {
    try {
        console.log("-----------------------userappoint--------------------------------")
        const appointments = await Appointment.findAll({ where: { userid: req.body.userid } })
        return res.status(200).json({
            success: true,
            message: "Users appointment fetch successfully",
            data: appointments
        })
    } catch (err) {
        res.status(500).json(err)
    }
}