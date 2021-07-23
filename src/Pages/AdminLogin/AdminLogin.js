import React, { useState } from 'react'
import { GrStackOverflow } from "react-icons/gr";
import { Link, useHistory } from "react-router-dom"
import './AdminLogin.css'
import { InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { show, hide } from "../../features/loaderModalSlice"
import axios from "../../axios"
import { useDispatch } from 'react-redux'
import {loginAdmin} from '../../features/adminUserSlice'

const AdminLogin = () => {

    const dispatch = useDispatch();
    let history = useHistory();

    const [email, setEmail] = useState("")
    const [forgotEmail, setForgotEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showProgress, setShowProgress] = useState(false)
    const [forgotPasswordShow, setForgotPasswordShow] = useState(false)

    const loginSubmitHandler = (event) => {

        event.preventDefault();
        setError(false)
        setErrorMessage("")

        if (email.length === 0 || password.length === 0) {
            setError(true)
            setErrorMessage("All fields are required")
        }
        else {
            let formData = {
                email: email,
                password: password,
            }
            setShowProgress(true)
            dispatch(show())



            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post(`/api/admin/login/`, formData,)
                        .then((response) => {

                            if (response.data.result) {
                                setShowProgress(false)
                                dispatch(hide())
                                dispatch(loginAdmin(response.data.result))
                                localStorage.setItem("admin_token", response.data.result);
                                history.push(`/admin/dashboard`);
                            } else if(response.data.email){
                                setError(true)
                                setErrorMessage(response.data.email)
                                setShowProgress(false)
                                dispatch(hide())
                            }else if(response.data.password){
                                setError(true)
                                setErrorMessage(response.data.password)
                                setShowProgress(false)
                                dispatch(hide())
                            }else if (response.data.error) {
                                setError(true)
                                setErrorMessage(response.data.error)
                                setShowProgress(false)
                                dispatch(hide())
                            }
                           
                        })
                        .catch(error => {
                            console.log(error)
                            setShowProgress(false)
                        })
                });

            setEmail("");
            setPassword("");
            setError(false)
            setErrorMessage("")

        }
    }

    const forgotPasswordSubmitHandler = (event) => {

        event.preventDefault();
        setError(false)
        setErrorMessage("")
        

        if (forgotEmail.length === 0  ) {
            setError(true)
            setErrorMessage("All fields are required")
        }else {
            let formData = {
                email: forgotEmail,
            }
            setShowProgress(true)
            dispatch(show())



            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post(`/api/admin/forgot-password`, formData,)
                        .then((response) => {
                            if(response.data.verified_email){
                                setShowProgress(false)
                                dispatch(hide())
                                history.push(`/admin/reset-password/${window.btoa(response.data.verified_email)}`);
                                
                            }else if(response.data.error){
                                setError(true)
                                setErrorMessage(response.data.error)
                                setShowProgress(false)
                                dispatch(hide())
                            }
                            else if(response.data.email){
                                setError(true)
                                setErrorMessage(response.data.email)
                                setShowProgress(false)
                                dispatch(hide())
                            }
                           
                        })
                        .catch(error => {
                            console.log(error)
                            setShowProgress(false)
                            dispatch(hide())
                        })
                });

                setForgotEmail("");
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
                    {forgotPasswordShow === false ?
                        <h2>ADMIN LOGIN</h2>
                        :
                        <h2>ADMIN FORGOT PASSWORD</h2>
                    }
                </div>
                {error === true ?
                    <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                        <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div>
                    </div>
                    :
                    null
                }

                <div>
                    {forgotPasswordShow === false ?
                        <form onSubmit={loginSubmitHandler} style={{ width: "100%" }}>
                            <div className="row admin__login__row">
                                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                                    <InputGroup className="mb-2">
                                        <InputGroup.Text><AiOutlineMail className="svgColor" /></InputGroup.Text>
                                        <FormControl id="email" placeholder="Email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                                    </InputGroup>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                                    <InputGroup className="mb-2">
                                        <InputGroup.Text><RiLockPasswordLine className="svgColor" /></InputGroup.Text>
                                        <FormControl id="password" type="password" placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                                    </InputGroup>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                                    {showProgress ?
                                        <button className="admin__login__btn" type="button" disabled ><Spinner animation="border" variant="light" style={{ width: "1.5rem", height: "1.5rem" }} /></button>
                                        :
                                        <button className="admin__login__btn" type="submit" >Sign-in</button>

                                    }
                                </div>

                                <div className="col-xl-12 col-lg-12 col-sm-12 form__row" style={{ textAlign: "center" }}>
                                    <button className="admin__login__btn__forgot_password" type="button" onClick={()=>setForgotPasswordShow(!forgotPasswordShow)} >Forgot Passsword</button>
                                </div>
                            </div>
                        </form>
                        :
                        <form onSubmit={forgotPasswordSubmitHandler} style={{ width: "100%" }}>
                            <div className="row admin__login__row">
                                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                                    <InputGroup className="mb-2">
                                        <InputGroup.Text><AiOutlineMail className="svgColor" /></InputGroup.Text>
                                        <FormControl id="email" placeholder="Email" value={forgotEmail} onChange={(event) => { setForgotEmail(event.target.value) }} />
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
                                    <button className="admin__login__btn__forgot_password" type="button" onClick={()=>setForgotPasswordShow(!forgotPasswordShow)} >Sign-in</button>
                                </div>
                            </div>
                        </form>
                    }



                </div>

            </div>
        </div>
    )
}

export default AdminLogin
