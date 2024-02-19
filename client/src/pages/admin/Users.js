import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Table, message } from 'antd'
import axios from 'axios'
import moment from 'moment/moment'
const Users = () => {
    const [users, setUsers] = useState([])
    // get users
    const getUsers = async () => {
        try {
            const res = await axios.get("http://localhost:4000/getAllUsers", { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            if (res.data.success) {
                console.log(res.data.data)
                setUsers(res.data.data)
            }
        } catch (err) {
            console.log(err)
            message.error("something went wrong")
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    //design with ant design

    const columns = [
        {
            title: "Name",
            dataIndex: 'name'
        },
        {
            title: "Email",
            dataIndex: 'email'
        },
        {
            title: "Doctor",
            dataIndex: 'Doctor',
            render: (text, record) => (
                <span>{record.isDoctor ? "Yes" : "No"}</span>
            )
        },
        {
            title: "Created At",
            dataIndex: 'createdAt',
            render: (text, record) => (
                <span>{moment(record.createdAt).calendar()}</span>
            )
        },
        {
            title: "Actions",
            dataIndex: 'actions',
            render: (text, record) => (

                <div className='d-flex'>
                    <button className='btn btn-danger'>Block</button>
                </div>
            )

        }
    ]
    return (
        <Layout>
            <h1 className='text-center'>Users List</h1>
            <Table columns={columns} dataSource={users} />
        </Layout>
    )
}

export default Users