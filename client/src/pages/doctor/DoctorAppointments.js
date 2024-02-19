import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { message, Table } from 'antd'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
const DoctorAppointments = () => {
    const { user } = useSelector(state => state.user)
    const [appointments, setAppointments] = useState()
    const getAppointments = async () => {
        try {
            const res = await axios.post('http://localhost:4000/doctor-appointment', { userid: user.id }, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            if (res.data.success) {
                console.log("app", res.data.data)
                setAppointments(res.data.data)
            }
        } catch (err) {
            console.log(err)
            message.error("something went wrong with appointments fetching")
        }
    }
    useEffect(() => {
        getAppointments()
    }, [])
    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post('http://localhost:4000/updateStatus', { appointmentId: record.id, status: status }, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            if (res.data.success) {
                message.success(res.data.message)
                getAppointments()
            }
        } catch (err) {
            console.log(err)
            message.error("something went wrong with update status")
        }
    }
    const columns = [
        {
            title: "ID",
            dataIndex: 'id'
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>{record.userInfo.name}</span>

            )
        }, {
            title: "Email",
            dataIndex: "name",
            render: (text, record) => (
                <span>{record.userInfo.email} </span>

            )
        }, {
            title: "Date & Time",
            dataIndex: "date",
            render: (text, record) => (
                <span>{moment(record.date).format('DD-MM-YYYY')} &nbsp; {moment(record.time).format('HH:mm')}</span>

            )
        }, {
            title: "Status",
            dataIndex: "status"
        }, {
            title: "Actions",
            dataIndex: "action",
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status === "pending" && (
                        <div className='d-flex'>
                            <button className='btn btn-primary' onClick={() => handleStatus(record, "approved")}>Approved</button> &nbsp;
                            <button className='btn btn-danger' onClick={() => handleStatus(record, "reject")}>Reject</button>

                        </div>
                    )}
                </div>
            )
        }
    ]
    return (
        <Layout>
            <h1 className='text-center'> Doctor Appointments</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default DoctorAppointments