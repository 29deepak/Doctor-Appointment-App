const User = require('../modals/user');
const Doctor = require("../modals/doctor");
const Appointment = require('../modals/appointment');

exports.getDoctorInfo = async (req, res) => {
    try {
        const { id } = req.body
        const doctor = await Doctor.findOne({
            where: {
                userid: id
            }
        });
        return res.status(200).json({
            success: true,
            message: "doctor data fetch success",
            data: doctor
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}


exports.updateProfile = async (req, res) => {
    try {

        const doctor = await Doctor.findOne({
            where: {
                userid: req.body.userid
            }
        });
        const updatedDoctor = await doctor.update(req.body);
        console.log("updated", updatedDoctor)
        res.status(201).json({
            success: true,
            message: "Doctor Profile Updated",
            data: updatedDoctor
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({
            where: { id: req.body.doctorId }
        })
        return res.status(200).json({
            success: true,
            message: 'Single Doctor Info fetched',
            data: doctor
        })

    } catch (err) {
        return res.status(500).json(err)
    }
}
exports.doctorAppointment = async (req, res) => {
    try {
        console.log("-------------doctor-appoi", req.body)
        const doctor = await Doctor.findOne({
            where: { userid: req.body.userid }
        })
        const appointments = await Appointment.findAll({ where: { doctorId: doctor.id } })
        return res.status(200).json({
            success: true,
            message: "Doctor Appointments Fetched succesfully",
            data: appointments
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.updateStatusController = async (req, res) => {
    try {
        console.log("-----------------------------------------", req.body)
        const { appointmentId, status } = req.body;
        const appointment = await Appointment.findOne({ where: { id: appointmentId } })
        const updateAppointment = await Appointment.update({
            status: status
        }, { where: { id: appointmentId } })

        const user = await User.findOne({ where: { id: appointment.userid } })
        console.log("=====", user)
        const notification = user.notification === null ? [] : user.notification
        notification.push({
            type: "status-updated",
            message: `your Appointment has been updated ${status} `,
            onClickPath: "/doctor/notification"
        })
        console.log(notification)
        const updatedUser = await User.update({
            notification: notification,
        }, { where: { id: appointment.userid } });
        return res.status(200).json({
            success: true,
            message: "Appointment status updated"
        })


    } catch (err) {
        return res.status(500).json(err)
    }
}