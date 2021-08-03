import React, { useState } from 'react'
import { InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { AiOutlineMail } from "react-icons/ai";
import './Login.css';
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useHistory } from 'react-router-dom'
import axios from "../../axios"
import { useDispatch } from 'react-redux'
import { login } from '../../features/userSlice'
import { show, hide } from "../../features/loaderModalSlice"
import { toastStart, toastEnd } from "../../features/toasterSlice"

const LoginForm = () => {

    const dispatch = useDispatch();
    let history = useHistory();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showProgress, setShowProgress] = useState(false)

    
    



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
                    axios.post(`/api/login/`, formData,)
                        .then((response) => {

                            if (response.data.result) {
                                setShowProgress(false)
                                dispatch(hide())
                                dispatch(toastEnd())
                                dispatch(toastStart({
                                    toasterStatus: true,
                                    toasterMessage: "User Loggedin Successfully",
                                    toasterType: "success",
                                    timeline: Date().toLocaleString()
                                }))
                                dispatch(toastEnd())
                                setEmail("");
                                setPassword("");
                                dispatch(login(response.data.result))
                                localStorage.setItem(window.btoa("token"), window.btoa(response.data.result));
                                let userToken = window.atob(localStorage.getItem(window.btoa("token")));
                                if(userToken!==null){
                                    history.push(`/`);
                                    // window.location.reload();
                                }
                            } else if (response.data.error) {
                                setError(true)
                                setErrorMessage(response.data.error)
                                setShowProgress(false)
                                dispatch(hide())
                            }
                           
                        })
                        .catch(error => {
                            console.log(error)
                            setShowProgress(false)
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

            
            setError(false)
            setErrorMessage("")

        }

    }

    return (
        <div className="row  register__row login__row">
            <form onSubmit={loginSubmitHandler} style={{ width: "100%" }}>
                {error === true ?
                    <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                        <div style={{ color: "red" }}>{errorMessage}</div>
                    </div>
                    :
                    null
                }
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
                    <div className="row" style={{ width: "100%", justifyContent: "space-between" }}>
                        <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__left"><Link to="/"><button className="register__btn ">Cancel</button></Link></div>
                        {showProgress ?
                            <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__right"><button className="register__btn" type="button" disabled ><Spinner animation="border" variant="light" style={{ width: "1.5rem", height: "1.5rem" }} /></button></div>
                            :
                            <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__right"><button className="register__btn" type="submit" >Sign-in</button></div>

                        }

                    </div>
                </div>

                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                    <div className="row" style={{ width: "100%", justifyContent: "space-between" }}>
                        <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__left"><button className="register__btn extra__link__login">Forgot Passsword</button></div>
                        <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__right"><Link to="/register"><button className="register__btn extra__link__login">Register</button></Link></div>

                    </div>
                </div>

                
            </form>
        </div>
    )
}

export default LoginForm