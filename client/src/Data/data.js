import { IoMdHome } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
export const userMenu = [
    {
        name: "Home",
        path: "/",
        icon: <IoMdHome />
    },
    {
        name: "Appointments",
        path: "/appointments",
        icon: <FaList />
    },
    {
        name: "Apply Doctor",
        path: "/apply-doctor",
        icon: <FaUserDoctor />
    },
    {
        name: "Profile",
        path: "/profile",
        icon: < FaUser />
    },
    // {
    //     name: "Logout",
    //     path: "/logout",
    //     icon: < IoLogOut />
    // },
]
//for admin


export const adminMenu = [
    {
        name: "Home",
        path: "/",
        icon: <IoMdHome />
    },
    {
        name: "Doctors",
        path: "/admin/doctors",
        icon: <FaUserDoctor />
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: < FaUser />
    }, {
        name: "Profile",
        path: "/profile",
        icon: < FaUser />
    },

]

//  const doctorMenu = [
//     {
//         name: "Home",
//         path: "/",
//         icon: <IoMdHome />
//     },
//     {
//         name: "Appointments",
//         path: "/appointments",
//         icon: <FaList />
//     },

//     {
//         name: "Profile",
//         path: `/doctor/profile/${id}`,
//         icon: < FaUser />
//     },
// ]