import React, { useState } from 'react'
import { GrStackOverflow } from "react-icons/gr";
import { Link, useHistory, useParams } from "react-router-dom"
import './AdminResetPassword.css'
import { InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { show, hide } from "../../features/loaderModalSlice"
import axios from "../../axios"
import { useDispatch } from 'react-redux'
import { toastStart, toastEnd } from "../../features/toasterSlice"

const AdminResetPassword = () => {

    const dispatch = useDispatch();
    let {email} = useParams();
    let history = useHistory();

    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showProgress, setShowProgress] = useState(false)

    const loginSubmitHandler = (event) => {

        event.preventDefault();
        setError(false)
        setErrorMessage("")
        

        if (otp.length === 0 || password.length === 0 || cpassword.length === 0 ) {
            setError(true)
            setErrorMessage("All fields are required")
        } else if (password !== cpassword  ) {
            setError(true)
            setErrorMessage("Both password must match")
        } 
        else {
            let formData = {
                otp: otp,
                password: password,
            }
            setShowProgress(true)
            dispatch(show())



            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post(`/api/admin/reset-password/${window.atob(email)}`, formData,)
                        .then((response) => {
                            
                            if(response.data.result){
                                setShowProgress(false)
                                dispatch(hide())
                                dispatch(toastEnd())
                                dispatch(toastStart({
                                    toasterStatus: true,
                                    toasterMessage: "Password Reset Successfully",
                                    toasterType: "success",
                                    timeline: Date().toLocaleString()
                                }))
                                dispatch(toastEnd())
                                history.push(`/admin`);
                            }else if(response.data.error){
                                setError(true)
                                setErrorMessage(response.data.error)
                                setShowProgress(false)
                                dispatch(hide())
                            }
                            else if(response.data.otp){
                                setError(true)
                                setErrorMessage(response.data.otp)
                                setShowProgress(false)
                                dispatch(hide())
                            }
                            else if(response.data.password){
                                setError(true)
                                setErrorMessage(response.data.otp)
                                setShowProgress(false)
                                dispatch(hide())
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            setShowProgress(false)
                            dispatch(hide())
                            dispatch(toastEnd())
                            dispatch(toastStart({
                                toasterStatus: true,
                                toasterMessage: "Oops! some error occurred",
                                toasterType: "error",
                                timeline: Date().toLocaleString()
                            }))
                            dispatch(toastEnd())
                        })
                });

                setOtp("");
                setPassword("");
                setCPassword("");
                setError(false)
                setErrorMessage("")
        }
    }

    return (
        <div className="admin__login__outer__div">
            <div className="admin__login__inner__div">

                <div className="logo__div">
                    <div className="row" style={{ justifyContent: "center" }}>
                        <div className="logo">
                            <Link to="/"><p><GrStackOverflow /> GServes</p></Link>
                        </div>
                    </div>
                </div>

                <div className="heading__div">
                    <h2>ADMIN RESET PASSWORD</h2>
                </div>
                {error === true ?
                    <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                        <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div>
                    </div>
                    :
                    null
                }

                <div>
                    <form onSubmit={loginSubmitHandler} style={{ width: "100%" }}>
                        <div className="row admin__login__row">
                            <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                                <InputGroup className="mb-2">
                                    <InputGroup.Text><AiOutlineMail className="svgColor" /></InputGroup.Text>
                                    <FormControl id="email" placeholder="Otp" value={otp} onChange={(event) => { setOtp(event.target.value) }} />
                                </InputGroup>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                                <InputGroup className="mb-2">
                                    <InputGroup.Text><RiLockPasswordLine className="svgColor" /></InputGroup.Text>
                                    <FormControl id="password" type="password" placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                                </InputGroup>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                                <InputGroup className="mb-2">
                                    <InputGroup.Text><RiLockPasswordLine className="svgColor" /></InputGroup.Text>
                                    <FormControl id="password" type="password" placeholder="Confirm Password" value={cpassword} onChange={(event) => { setCPassword(event.target.value) }} />
                                </InputGroup>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                                {showProgress ?
                                    <button className="admin__login__btn" type="button" disabled ><Spinner animation="border" variant="light" style={{ width: "1.5rem", height: "1.5rem" }} /></button>
                                    :
                                    <button className="admin__login__btn" type="submit" >Reset Password</button>

                                }
                            </div>

                            <div className="col-xl-12 col-lg-12 col-sm-12 form__row" style={{ textAlign: "center" }}>
                                <Link className="admin__login__btn__forgot_password" to="/admin" >Sign-in</Link>
                            </div>
                        </div>
                    </form>




                </div>

            </div>
        </div>
    )
}

export default AdminResetPassword
