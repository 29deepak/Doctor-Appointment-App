const Doctor = require("../modals/doctor")
const User = require("../modals/user")
exports.applyDoctor = async (req, res) => {
    try {
        const newDoctor = await Doctor.create({ ...req.body, status: "pending" })
        const adminUser = await User.findOne({
            where: {
                isAdmin: true
            }
        });
        console.log("------------adminuser", adminUser)
        const notification = []
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} + " " + ${newDoctor.lastName} has Applied For A Doctor Account`,
            data: {
                doctorId: newDoctor.id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: "/admin/doctors"
            }
        })
        await User.update({ notification }, { where: { id: adminUser.id } })
        return res.status(201).json({ success: true, message: "Doctor Applied Account Successfully" })

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getAllNotifications = async (req, res) => {
    try {
        console.log("-------------------------------------------")
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        })
        console.log(user.notification, "erfvghfjdfvbhfjdfvn ")
        const seenNotification = user.notification
        console.log("notificat", seenNotification)
        // seenNotification = [...seenNotification]
        // console.log("notificat2345", seenNotification)
        const notification = []


        const updatedUser = await user.update({
            seenNotification: seenNotification,
            notification: notification
        });
        console.log(JSON.stringify(updatedUser))
        return res.status(200).json(
            {
                message: true,
                message: 'all notifications mark as Read',
                data: updatedUser
            }
        )



    } catch (err) {
        return res.status(400).json(err)
    }
}
exports.deleteAllNotifications = async (req, res) => {
    try {
        console.log("000000")
        const user = await User.findOne(
            {
                where: {
                    id: req.user.id
                }
            }
        )
        // console.log(user)
        const seenNotification = []
        const notification = []
        const updatedUser = await user.update({
            seenNotification: seenNotification,
            notification: notification
        });
        console.log(updatedUser)
        return res.status(200).json(
            {
                success: true,
                message: "Notifications Deleted Successfully",
                data: updatedUser
            }
        )

    }
    catch (err) {
        return res.status(400).json(err)
    }
}

exports.getAllDoctor = async (req, res) => {
    try {
        const doctors = await Doctor.findAll({ where: { status: "approved" } })
        return res.status(200).json({
            success: true,
            message: "Doctors List Fetched Successfully",
            data: doctors
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)

    }
}
