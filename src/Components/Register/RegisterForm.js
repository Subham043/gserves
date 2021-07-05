import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'
import { AiOutlineMail, AiOutlineMobile, AiOutlineUser } from "react-icons/ai";
import { BiMessageCheck } from "react-icons/bi";
import { Link } from 'react-router-dom';
import './Register.css';

const RegisterForm = () => {
    return (
        <div className="row  register__row">
            <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                <InputGroup className="mb-2">
                    <InputGroup.Text><AiOutlineUser className="svgColor" /></InputGroup.Text>
                    <FormControl id="first_name" placeholder="First Name" />
                </InputGroup>
            </div>
            <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                <InputGroup className="mb-2">
                    <InputGroup.Text><AiOutlineUser className="svgColor" /></InputGroup.Text>
                    <FormControl id="last_name" placeholder="Last Name" />
                </InputGroup>
            </div>

            <div className="row" style={{ width: "100%" }}>

                <div className="col-xl-3 col-lg-3 col-sm-12 form__row">
                    <InputGroup className="mb-2">
                        <InputGroup.Text><AiOutlineMobile className="svgColor" /></InputGroup.Text>
                        <FormControl id="country_code" placeholder="+91" />
                    </InputGroup>
                </div>

                <div className="col-xl-6 col-lg-6 col-sm-12 form__row mobile__form__row">
                    <FormControl id="phone" placeholder="Mobile Number" />
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
                    <FormControl id="email" placeholder="Email" />
                </InputGroup>
            </div>
            <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                <InputGroup className="mb-2">
                    <InputGroup.Text><BiMessageCheck className="svgColor" /></InputGroup.Text>
                    <FormControl id="message" placeholder="Message" />
                </InputGroup>
            </div>
            <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                <div className="row" style={{ width: "100%", justifyContent: "space-between" }}>
                    <div className="col-xl-4 col-lg-4 col-sm-12 button__row register__btn__left"><Link to="/"><button className="register__btn">Cancel</button></Link></div>
                    <div className="col-xl-4 col-lg-4 col-sm-12 button__row register__btn__center"><Link to="/login"><button className="register__btn">Sign-in</button></Link></div>
                    <div className="col-xl-4 col-lg-4 col-sm-12 button__row register__btn__right"><button className="register__btn">Register</button></div>

                </div>
            </div>
        </div>
    )
}

export default RegisterForm
