import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message, notification } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../store/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const NotificationPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading())

            const res = await axios.post("http://localhost:4000/get-all-notification", { userId: user.id }, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error("something went wrong")
            }
        } catch (err) {
            console.log(err)
            dispatch(hideLoading())
            message.error("something went wrong")
        }
    }
    const handleDeleteAllRead = async () => {
        try {
            console.log("------------------")
            dispatch(showLoading())

            const res = await axios.post("http://localhost:4000/delete-all-notification", { userId: user.id }, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error("something went wrong")
            }
        } catch (err) {
            console.log(err)
            dispatch(hideLoading())
            message.error("something went wrong")
        }
    }
    return (
        <Layout>
            <h4 className='p-3 text-cnter'>NotificationPage</h4>
            <Tabs>
                <Tabs.TabPane tab="unRead" key={0}>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2 text-primary' style={{ cursor: "pointer" }} onClick={handleMarkAllRead}>Mark All Read</h4>

                    </div>
                    {user?.notification.map(notificationMsgs => (
                        <div className='card' onClick={() => navigate(notificationMsgs.onClickPath)} style={{ cursor: "pointer" }}>
                            <div className='card-text'>
                                {notificationMsgs.message}
                            </div>
                        </div>
                    ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key={1}>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2 text-primary' style={{ cursor: "pointer" }} onClick={handleDeleteAllRead}>Delete All Read</h4>

                    </div>
                    {user?.seenNotification.map(notificationMsgs => (
                        <div className='card' onClick={() => navigate(notificationMsgs.onClickPath)} style={{ cursor: "pointer" }}>
                            <div className='card-text'>
                                {notificationMsgs.message}
                            </div>
                        </div>
                    ))}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default NotificationPage