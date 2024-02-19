import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { DatePicker, TimePicker, message } from 'antd'
import moment from 'moment/moment'
import { hideLoading, showLoading } from '../store/alertSlice'
import { useSelector, useDispatch } from 'react-redux'
import { setIsAvailable } from '../store/availableSlice'
const BookingPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { isAvailable } = useSelector(state => state.available)
    console.log("redux", isAvailable)
    const [doctor, setDoctor] = useState(null)
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    console.log("date", date)
    console.log("timings", time)
    const getSingleDoctor = async () => {
        try {
            const res = await axios.post("http://localhost:4000/getDoctorById", { doctorId: params.doctorId }, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            if (res.data.success) {
                console.log("sdfvfbgnfd", res.data.data)
                setDoctor(res.data.data)

            }
        } catch (err) {

            console.log(err)
            message.error("something went wrong")
        }
    }

    const handleBooking = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:4000/book-appointment", { doctorId: params.doctorId, userid: user.id, doctorInfo: doctor, date: date, time: time, userInfo: user }, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            }
        } catch (err) {
            dispatch(hideLoading())
            console.log(err)
            message.error("something went wrong")
        }
    }


    const handleAvailabilty = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:4000/booking-availability", { doctorId: params.doctorId, date: date, time: time }, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            dispatch(hideLoading())
            if (res.data.success) {
                console.log("-------------------avai-------------------------------------")
                dispatch(setIsAvailable())
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }

        } catch (err) {
            dispatch(hideLoading())
            console.log(err)
            message.error("something went wrong")
        }
    }
    useEffect(() => {
        getSingleDoctor()
    }, [])
    return (
        <Layout>

            <h1 className='text-center'>Booking Page</h1>
            <div className='container m-2'>
                {doctor && (
                    <div>
                        <h4>Dr. {doctor.firstName} {doctor.lastName} </h4>
                        <h4>Fees :{doctor.feesPerConsultation}</h4>
                        <h4>Timings:{doctor.timings[0]}-{doctor.timings[1]}</h4>
                        <div className='d-flex flex-column'></div>
                        <DatePicker format="DD-MM-YYYY" onChange={(momentObj, dateString) => {
                            // console.log("moment", dateString)
                            setDate(dateString)
                        }
                        }
                        />
                        <TimePicker format="HH:mm" onChange={(time, timeString) => {
                            // console.log("time", timeString)
                            setTime(timeString)
                        }} />
                        <div>
                            <button className='btn btn-primary' onClick={handleAvailabilty}>Check Availability</button>
                            {isAvailable && <button className='btn btn-primary' onClick={handleBooking}>Book Now</button>}
                        </div>


                    </div>
                )}
            </div>
        </Layout>
    )
}

export default BookingPage