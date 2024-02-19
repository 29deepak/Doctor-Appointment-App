import React, { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd'
import '../styles/RegisterStyle.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../store/alertSlice'
import { useSelector, useDispatch } from 'react-redux'
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        console.log(values)
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:4000/login", values);
            if (res.data.success) {
                localStorage.setItem("token", res.data.token)
                dispatch(hideLoading())
                message.success("login successfully")
                window.location.reload()
                navigate("/")


            } else {
                dispatch(hideLoading())
                message.error("something went wrong with login")
            }

        } catch (err) {
            dispatch(hideLoading())
            message.error("something wrong with your registartion")
        }

    }

    // const fetch1 = async () => {
    //     try {
    //         const data = await axios.post("http://localhost:4000/getuserData", {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    //         console.log(data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    return (
        <>
            <h4 className='text-center'>Login Form</h4>
            <div className='form-container '>

                <Form layout='vertical' onFinish={onFinish} className='register-form'>
                    <Form.Item label="Email" name="email">
                        <Input type="email" required />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" required />
                    </Form.Item>
                    <Link to="/register">Not Register ? Register</Link>
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form>
            </div>
        </>
    )
}

export default Login