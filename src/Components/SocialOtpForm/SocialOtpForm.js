import React, { useState } from 'react'
import { InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { AiOutlineMail } from "react-icons/ai";
import '../Login/Login.css';
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useParams, useHistory } from 'react-router-dom'
import axios from "../../axios"
import { useDispatch } from "react-redux"
import { show, hide } from "../../features/loaderModalSlice"
import { login } from '../../features/userSlice'

const SocialOtpForm = () => {

    const dispatch = useDispatch();


    let {email} = useParams();
    let history = useHistory();

    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showProgress, setShowProgress] = useState(false)

    const otpSubmitHandler = async (event) => {
        event.preventDefault();
        setError(false)
        setErrorMessage("")
        

        if (otp.length === 0 || password.length === 0 || cPassword.length === 0 ) {
            setError(true)
            setErrorMessage("All fields are required")
        } else if (password !== cPassword  ) {
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
                    axios.post(`/api/social/verify/${window.atob(email)}`, formData,)
                        .then((response) => {
                            
                            if(response.data.result){
                                setShowProgress(false)
                                dispatch(hide())
                                if(response.data.result === "User Otp verified and User Verified"){
                                    dispatch(login(response.data.token))
                                    localStorage.setItem("token", response.data.token);
                                    history.push(`/`);
                                }else if(response.data.result === "illegal email"){
                                    history.push(`/`);
                                }
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
        <div className="row  register__row login__row">
            <form style={{ width: "100%" }} onSubmit={otpSubmitHandler}>
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
                        <FormControl id="cPassword" type="password" placeholder="Confirm Password" value={cPassword} onChange={(event) => { setCPassword(event.target.value) }} />
                    </InputGroup>
                </div>

                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                    <div className="row" style={{ width: "100%", justifyContent: "space-between" }}>
                        <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__left"><Link to="/"><button className="register__btn " type="button">Cancel</button></Link></div>
                        {showProgress?
                            <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__right"><button className="register__btn" type="button" disabled ><Spinner animation="border" variant="light" style={{width:"1.5rem", height:"1.5rem"}} /></button></div>
                            :
                            <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__right"><button className="register__btn" type="submit" >Verify</button></div>
                            
                        }

                    </div>
                </div>

            </form>
        </div>
    )
}

export default SocialOtpForm