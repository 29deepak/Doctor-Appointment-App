const User = require('../modals/user');
const Doctor = require("../modals/doctor")
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        return res.status(200).json({
            success: true,
            message: 'users data',
            data: users

        })


    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        return res.status(200).json({
            success: true,
            message: 'doctors data',
            data: doctors

        })
    } catch (err) {
        return res.status(500).json(err)
    }
}
exports.changeAccountStatus = async (req, res) => {
    try {
        console.log(req.body)
        const { doctorId, userid, status } = req.body;
        const doctor = await Doctor.update({ status }, {
            where: {
                id: doctorId
            }
        })
        const user = await User.findOne({ where: { id: userid } })
        const notification = user.notification === null ? [] : user.notification
        notification.push({
            type: "doctor-account-request-updated",
            message: `your Doctor Account request has ${status} `,
            onClickPath: "/notification"
        })
        console.log(notification)
        const updatedUser = await user.update({
            notification: notification,
            isDoctor: true
        }, { where: { id: doctor.userid } });
        console.log(updatedUser)
        res.status(201).json({
            success: true,
            message: "Account Status Updated",
            data: doctor
        })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}