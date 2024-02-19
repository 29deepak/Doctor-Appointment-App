import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { message, Table } from 'antd'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
const Appointments = () => {
    const { user } = useSelector(state => state.user)
    const [appointments, setAppointments] = useState()
    const getAppointments = async () => {
        try {
            const res = await axios.post('http://localhost:4000/user-appointment', { userid: user.id }, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
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
    const columns = [
        {
            title: "ID",
            dataIndex: 'id'
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>{record.doctorInfo.firstName} {record.doctorInfo.lastName}</span>

            )
        }, {
            title: "Phone",
            dataIndex: "name",
            render: (text, record) => (
                <span>{record.doctorInfo.phone} </span>

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
        }
    ]
    return (
        <Layout>
            <h1 className='text-center'>Appointments List</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>

    )
}

export default Appointments