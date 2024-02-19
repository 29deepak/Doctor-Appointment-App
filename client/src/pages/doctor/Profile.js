import React, { useEffect, useState } from 'react'
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import Layout from '../../components/Layout'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../../store/alertSlice'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
const Profile = () => {
    const { user } = useSelector(state => state.user)
    const [doctor, setDoctors] = useState(null)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleFinish = async (values) => {
        console.log(values)
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:4000/updateProfile", { ...values, userid: user.id, timings: [moment(values.timings[0]).format("HH:mm"), moment(values.timings[1]).format("HH:mm")] }, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success("updated succesfully")
                navigate("/")
            }
        } catch (err) {
            dispatch(hideLoading())
            message.error("something wrong with update user")
        }
    }


    //get Doc Details

    const getDoctorInfo = async () => {
        try {
            const res = await axios.post("http://localhost:4000/getDoctorInfo", { id: id }, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            if (res.data.success) {
                console.log(res.data.data)
                setDoctors(res.data.data)
            }
        } catch (err) {
            console.log(err)
            message.error("something went wrong!")
        }
    }
    useEffect(() => {
        getDoctorInfo()
    }, [])
    return (
        <Layout>

            <h1 className='text-center'> Manage Profile</h1>
            {doctor && (
                <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={{
                    ...doctor,
                    timings: [moment(doctor.timings[0], "HH:mm"), moment(doctor.timings[1], "HH:mm")]
                }}>
                    <h4 className=''>Personal Details :</h4>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>

                            <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your first name' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>

                            <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your last name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>

                            <Form.Item label="Phone No" name="phone" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your contact no' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>

                            <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                                <Input type="email" placeholder='Enter ypur email' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>

                            <Form.Item label="Website" name="website" >
                                <Input type="text" placeholder='enter website(optional)' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>

                            <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='Address' />
                            </Form.Item>
                        </Col>

                    </Row>
                    <h4>Professional Details:</h4>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>

                            <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your specialization' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>

                            <Form.Item label="Experience" name="experience" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your experience' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>

                            <Form.Item label="Fees per Consulaltation" name="feesPerConsultation" required rules={[{ required: true }]}>
                                <Input type="text" placeholder='your feesPerConsultation' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>

                            <Form.Item label="Timings" name="timings" required rules={[{ required: true }]} >
                                <TimePicker.RangePicker format="HH:mm" />
                            </Form.Item>
                        </Col>


                    </Row>
                    <div className='d-flex justify-content-end' >
                        <button className='btn btn-primary' type="submit"> Submit</button>
                    </div>
                </Form>
            )}
        </Layout>
    )
}

export default Profile