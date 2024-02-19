import React from 'react'
import '../styles/Layout.css'
import { adminMenu, userMenu } from '../Data/data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge, message } from 'antd'
import { IoIosNotifications } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
const Layout = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useSelector(state => state.user)
    const doctorMenu = [
        {
            name: "Home",
            path: "/",
            icon: <IoMdHome />
        },
        {
            name: "Appointments",
            path: "/doctor-appointments",
            icon: <FaList />
        },

        {
            name: "Profile",
            path: `/doctor/profile/${user?.id}`,
            icon: < FaUser />
        },
    ]


    const sidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu
    const handleLogout = () => {
        localStorage.clear()
        message.success("logout successfully")
        navigate("/login")
    }

    return (
        <div className='main'>
            <div className='layout'>
                <div className='sidebar'>
                    <div className='logo'>
                        <h6>Doc App</h6>
                        <hr />
                    </div>
                    <div className='menu'>
                        {sidebarMenu.map(menu => {
                            const isActive = location.pathname === menu.path
                            return (
                                <>
                                    <div className={`menu-item ${isActive && 'active'}`}>
                                        <i>{menu.icon}</i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            )
                        })}
                        <div className={`menu-item`} onClick={handleLogout}>
                            <i><IoLogOut /></i>
                            <Link to="/login">Logout</Link>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <div className='header-content'>
                            <Badge count={user?.notification ? user.notification.length : ""} onClick={() => navigate('/allNotification')}>
                                <i>< IoIosNotifications /></i>

                            </Badge>
                            <Link to="/profile">{user?.name}</Link>
                        </div>
                    </div>
                    <div className='body'>{children}</div>
                </div>
            </div>

        </div>
    )
}

export default Layout