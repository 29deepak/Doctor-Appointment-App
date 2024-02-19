import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Table, message } from 'antd'
import axios from 'axios'
import moment from 'moment/moment'
const Doctors = () => {
    const [doctors, setDoctors] = useState([])
    const getDoctors = async () => {
        try {
            const res = await axios.get("http://localhost:4000/getAllDoctors", { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            if (res.data.success) {
                console.log(res.data.data)
                setDoctors(res.data.data)
            }
        } catch (err) {
            console.log(err)
            message.error("something went wrong")
        }
    }
    useEffect(() => {
        getDoctors()
    }, [])
    console.log(doctors, "fgbn vc")
    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post("http://localhost:4000/changeAccountStatus", { doctorId: record.id, userid: record.userid, status: status }, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            if (res.data.success) {
                message.success(res.data.message)
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
            message.error("something went wrong")
        }
    }

    const columns = [
        {
            title: "Name",
            dataIndex: 'name',
            render: (text, record) => (
                <span>{record.firstName} {" "} {record.lastName}</span>
            )

        },
        {
            title: "Status",
            dataIndex: 'status'
        },
        {
            title: "Phone",
            dataIndex: 'phone',
        },
        {
            title: "Actions",
            dataIndex: 'actions',
            render: (text, record) => (

                <div className='d-flex'>
                    {
                        record.status === "pending" ? <button className='btn btn-success' onClick={() => handleAccountStatus(record, 'approved')}>Approve</button> : <button className='btn btn-danger'>Reject</button>
                    }
                </div>
            )

        }
    ]
    return (
        <Layout>
            <h1 className='text-center'>Doctors List</h1>
            <Table columns={columns} dataSource={doctors} />
        </Layout>
    )
}

export default Doctors