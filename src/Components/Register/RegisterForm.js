import React, { useState } from 'react'
import { InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { AiOutlineMail, AiOutlineMobile, AiOutlineUser } from "react-icons/ai";
import { Link, useHistory } from 'react-router-dom';
import './Register.css';
import axios from '../../axios'
import { useDispatch } from "react-redux"
import { show, hide } from "../../features/loaderModalSlice"
import { RiLockPasswordLine } from "react-icons/ri";
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";

const RegisterForm = () => {

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [phone, setPhone] = useState("")
    const [whatsapp_phone, setWhatsapp_phone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showProgress, setShowProgress] = useState(false)
    const [uppercase, setUppercase] = useState(false)
    const [lowercase, setLowercase] = useState(false)
    const [digit, setDigit] = useState(false)
    const [special, setSpecial] = useState(false)
    const [eight, setEight] = useState(false)





    let history = useHistory();

    const passwordHandler = (event) => {
        setPassword(event.target.value)
        if(event.target.value.length>=8){
            setEight(true)
        }else{
            setEight(false)
        }
        if((/.*[a-z].*$/.test(event.target.value))){
            setLowercase(true)
        }else{
            setLowercase(false)
        }
        if((/.*[A-Z].*$/.test(event.target.value))){
            setUppercase(true)
        }else{
            setUppercase(false)
        }
        if((/.*\d.*$/.test(event.target.value))){
            setDigit(true)
        }else{
            setDigit(false)
        }
        if((/.*\W.*$/.test(event.target.value))){
            setSpecial(true)
        }else{
            setSpecial(false)
        }
    }

    const registerSubmitHandler = async (event) => {
        event.preventDefault();
        setError(false)
        setErrorMessage("")

        if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || phone.length === 0 || countryCode.length === 0 || password.length === 0 || cPassword.length === 0) {
            setError(true)
            setErrorMessage("All fields are required")
        }else if(!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password))){
            setError(true)
            setErrorMessage("Password doesnot match the following validation");
        }else if(password !== cPassword){
            setError(true)
            setErrorMessage("Both password must match");
        } else {
            let formData = {
                first_name: firstName,
                last_name: lastName,
                phone: countryCode + phone,
                whatsapp_phone: whatsapp_phone,
                email: email,
                password: password,
            }
            setShowProgress(true)
            dispatch(show())



            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post('/api/register', formData,)
                        .then((response) => {

                            if (response.data.result) {
                                setShowProgress(false)
                                setFirstName("");
                                setLastName("");
                                setEmail("");
                                setPhone("");
                                setPassword("");
                                setCPassword("");
                                setPhone("");
                                setWhatsapp_phone("");
                                setCountryCode("");
                                dispatch(hide())
                                dispatch(toastEnd())
                                dispatch(toastStart({
                                    toasterStatus: true,
                                    toasterMessage: "User Registered Successfully",
                                    toasterType: "success",
                                    timeline: Date().toLocaleString()
                                }))
                                dispatch(toastEnd())
                                history.push(`/login`);
                            } else if (response.data.error) {
                                setShowProgress(false)
                                dispatch(hide())
                                setError(true)
                                setErrorMessage(response.data.error)
                            }
                            else if (response.data.first_name) {
                                setShowProgress(false)
                                dispatch(hide())
                                setError(true)
                                setErrorMessage(response.data.first_name)
                            }
                            else if (response.data.last_name) {
                                setShowProgress(false)
                                dispatch(hide())
                                setError(true)
                                setErrorMessage(response.data.last_name)
                            }
                            else if (response.data.email) {
                                setShowProgress(false)
                                dispatch(hide())
                                setError(true)
                                setErrorMessage(response.data.email)
                            }
                            else if (response.data.phone) {
                                setShowProgress(false)
                                dispatch(hide())
                                setError(true)
                                setErrorMessage(response.data.phone)
                            }
                            else if (response.data.whatsapp_phone) {
                                setShowProgress(false)
                                dispatch(hide())
                                setError(true)
                                setErrorMessage(response.data.whatsapp_phone)
                            }
                            else if (response.data.password) {
                                setShowProgress(false)
                                dispatch(hide())
                                setError(true)
                                setErrorMessage(response.data.password)
                            }
                        })
                        .catch(error => {
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
                            console.log(error)
                        })
                });

            
            setError(false)
            setErrorMessage("")

        }


    }

    return (
        <div className="row  register__row">
            <form onSubmit={registerSubmitHandler} style={{ width: "100%" }}>
                {error === true ?
                    <div className="col-xl-12 col-lg-12 col-sm-12 form__row">

                        <div style={{ color: "red" }}>{errorMessage}</div>
                    </div>
                    :
                    null
                }



                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                    <InputGroup className="mb-2">
                        <InputGroup.Text><AiOutlineUser className="svgColor" /></InputGroup.Text>
                        <FormControl id="first_name" placeholder="First Name" value={firstName} onChange={(event) => { setFirstName(event.target.value) }} />
                    </InputGroup>
                </div>
                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                    <InputGroup className="mb-2">
                        <InputGroup.Text><AiOutlineUser className="svgColor" /></InputGroup.Text>
                        <FormControl id="last_name" placeholder="Last Name" value={lastName} onChange={(event) => { setLastName(event.target.value) }} />
                    </InputGroup>
                </div>

                <div className="row" style={{ width: "100%" }}>

                    <div className="col-xl-3 col-lg-3 col-sm-12 form__row">
                        <InputGroup className="mb-2">
                            <InputGroup.Text><AiOutlineMobile className="svgColor" /></InputGroup.Text>
                            <FormControl id="country_code" placeholder="+91" value={countryCode} onChange={(event) => { setCountryCode(event.target.value) }} />
                        </InputGroup>
                    </div>

                    <div className="col-xl-9 col-lg-9 col-sm-12 form__row mobile__form__row">
                        <FormControl id="phone" placeholder="Mobile Number" value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                    </div>



                    {/* <div className="col-xl-3 col-lg-3 col-sm-12 form__row checkbox__form__row" >
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Whatsapp
                            </label>

                        </div>
                    </div> */}


                </div>


                <div className="col-xl-12 col-lg-12 col-sm-12 form__row mobile__form__row">
                    <InputGroup className="mb-2">
                        <InputGroup.Text><AiOutlineMobile className="svgColor" /></InputGroup.Text>
                        <FormControl id="whatsapp_phone" placeholder="Whatsapp Mobile Number (OPTIONAL)" value={whatsapp_phone} onChange={(event) => { setWhatsapp_phone(event.target.value) }} />
                    </InputGroup>
                </div>
                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                    <InputGroup className="mb-2">
                        <InputGroup.Text><AiOutlineMail className="svgColor" /></InputGroup.Text>
                        <FormControl id="email" placeholder="Email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                    </InputGroup>
                </div>
                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                    <InputGroup className="mb-2">
                        <InputGroup.Text><RiLockPasswordLine className="svgColor" /></InputGroup.Text>
                        <FormControl id="password" type="password" placeholder="Password" value={password} onChange={(event) => { passwordHandler(event) }} />
                    </InputGroup>
                </div>
                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                    <ul style={{listStyle:"none", padding: 0, paddingLeft: "10px"}}>
                        <li style={eight===false ? {textAlign: "left", color:"red" } : {textAlign: "left", color:"green" }}>{eight===false ? <ImCross /> : <TiTick />} Password must contain at least 8 characters</li>
                        <li style={uppercase===false ? {textAlign: "left", color:"red" } : {textAlign: "left", color:"green" }}>{uppercase===false ? <ImCross /> : <TiTick />} Password must contain at least 1 uppercase characters</li>
                        <li style={lowercase===false ? {textAlign: "left", color:"red" } : {textAlign: "left", color:"green" }}>{lowercase===false ? <ImCross /> : <TiTick />} Password must contain at least 1 lowercase characters</li>
                        <li style={digit===false ? {textAlign: "left", color:"red" } : {textAlign: "left", color:"green" }}>{digit===false ? <ImCross /> : <TiTick />} Password must contain at least 1 digit characters</li>
                        <li style={special===false ? {textAlign: "left", color:"red" } : {textAlign: "left", color:"green" }}>{special===false ? <ImCross /> : <TiTick />} Password must contain at least 1 special characters</li>
                    </ul>
                </div>
                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                    <InputGroup className="mb-2">
                        <InputGroup.Text><RiLockPasswordLine className="svgColor" /></InputGroup.Text>
                        <FormControl id="cPassword" type="password" placeholder="Confirm Password" value={cPassword} onChange={(event) => { setCPassword(event.target.value) }} />
                    </InputGroup>
                </div>



                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                    <div className="row" style={{ width: "100%", justifyContent: "space-between" }}>
                        <div className="col-xl-4 col-lg-4 col-sm-12 button__row register__btn__left"><Link to="/"><button className="register__btn" type="button">Cancel</button></Link></div>
                        <div className="col-xl-4 col-lg-4 col-sm-12 button__row register__btn__center"><Link to="/login"><button className="register__btn" type="button">Sign-in</button></Link></div>
                        {showProgress ?
                            <div className="col-xl-4 col-lg-4 col-sm-12 button__row register__btn__right"><button className="register__btn" type="button" disabled ><Spinner animation="border" variant="light" style={{ width: "1.5rem", height: "1.5rem" }} /></button></div>
                            :
                            <div className="col-xl-4 col-lg-4 col-sm-12 button__row register__btn__right"><button className="register__btn" type="submit" >Register</button></div>

                        }


                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm
