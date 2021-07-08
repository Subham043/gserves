import React, { useState } from 'react'
import { InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { AiOutlineMail, AiOutlineMobile, AiOutlineUser } from "react-icons/ai";
import { Link, useHistory } from 'react-router-dom';
import './Register.css';
import axios from '../../axios'

const RegisterForm = () => {



    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showProgress, setShowProgress] = useState(false)



    let history = useHistory();

    const registerSubmitHandler = async (event) => {
        event.preventDefault();
        setError(false)
        setErrorMessage("")

        if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || phone.length === 0 || countryCode.length === 0) {
            setError(true)
            setErrorMessage("All fields are required")
        } else {
            let formData = {
                first_name: firstName,
                last_name: lastName,
                phone: countryCode + phone,
                email: email
            }
            setShowProgress(true)



            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post('/api/register', formData,)
                        .then((response) => {

                            if (response.data.result) {
                                setShowProgress(false)
                                history.push(`/otp/${response.data.email}`);
                            } else if (response.data.error) {
                                setShowProgress(false)
                                setError(true)
                                setErrorMessage(response.data.error)
                            }
                        })
                        .catch(error => {
                            setShowProgress(false)
                            console.log(error)
                        })
                });

            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setCountryCode("");
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

                    <div className="col-xl-6 col-lg-6 col-sm-12 form__row mobile__form__row">
                        <FormControl id="phone" placeholder="Mobile Number" value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                    </div>

                    <div className="col-xl-3 col-lg-3 col-sm-12 form__row checkbox__form__row" >
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Whatsapp
                            </label>

                        </div>
                    </div>


                </div>

                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                    <InputGroup className="mb-2">
                        <InputGroup.Text><AiOutlineMail className="svgColor" /></InputGroup.Text>
                        <FormControl id="email" placeholder="Email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                    </InputGroup>
                </div>

                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                    <div className="row" style={{ width: "100%", justifyContent: "space-between" }}>
                        <div className="col-xl-4 col-lg-4 col-sm-12 button__row register__btn__left"><Link to="/"><button className="register__btn" type="button">Cancel</button></Link></div>
                        <div className="col-xl-4 col-lg-4 col-sm-12 button__row register__btn__center"><Link to="/login"><button className="register__btn" type="button">Sign-in</button></Link></div>
                        {showProgress?
                            <div className="col-xl-4 col-lg-4 col-sm-12 button__row register__btn__right"><button className="register__btn" type="button" disabled ><Spinner animation="border" variant="light" style={{width:"1.5rem", height:"1.5rem"}} /></button></div>
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
