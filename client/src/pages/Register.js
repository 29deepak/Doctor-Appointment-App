import React from 'react'
import { Button, Form, Input, message } from 'antd'
import '../styles/RegisterStyle.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../store/alertSlice'
import { useSelector, useDispatch } from 'react-redux'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values)
        try {
            dispatch(showLoading())
            await axios.post("http://localhost:4000/register", values)
            dispatch(hideLoading())
            message.success("Registration successfully")
            navigate("/login")

        } catch (err) {
            dispatch(hideLoading())
            message.error("something wrong with your registartion")
        }
    }
    return (
        <>

            <h4 className='text-center'>Register Form</h4>
            <div className='form-container '>

                <Form layout='vertical' onFinish={onFinish} className='register-form'>
                    <Form.Item label="Name" name="name">
                        <Input required />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="email" required />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" required />
                    </Form.Item>
                    <Link to="/login">Already Register ? Login</Link>
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form>
            </div>
        </>
    )
}

export default Register