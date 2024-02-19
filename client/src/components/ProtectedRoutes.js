import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../store/alertSlice'
import { setUser } from '../store/userSlice'
const ProtectedRoutes = ({ children }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    //
    const getUser = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:4000/getuserData", { token: localStorage.getItem('token') }, { headers: { Authorization: `bearer ${localStorage.getItem('token')}` } })
            dispatch(hideLoading())
            if (res.data.success) {
                dispatch(setUser(res.data.data))
            } else {
                <Navigate to="/login" />
                localStorage.clear()
            }

        }
        catch (err) {
            dispatch(hideLoading())
            localStorage.clear()
            console.log(err)
        }
    }
    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [user])

    if (localStorage.getItem("token")) {
        return children
    } else {
        return <Navigate to="/login" />
    }
}

export default ProtectedRoutes