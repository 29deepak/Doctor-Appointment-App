import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import { Row, Table, message } from 'antd'
import axios from 'axios'
import DoctorList from '../components/DoctorList';
const HomePage = () => {
    const [doctors, setDoctors] = useState([])
    const getAllDoctors = async () => {
        try {
            const res = await axios.get("http://localhost:4000/getAllDoctor", { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
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
        getAllDoctors()
    }, [])
    return (
        <Layout>
            <h1 className='text-center'>Homepage</h1>
            <Row>
                {
                    doctors && doctors.map((doctor) => {
                        return (

                            <DoctorList doctor={doctor} />
                        )
                    })
                }
            </Row>
        </Layout>
    )
}

export default HomePage