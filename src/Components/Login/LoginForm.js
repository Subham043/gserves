import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'
import { AiOutlineMail } from "react-icons/ai";
import './Login.css';
import { RiLockPasswordLine } from "react-icons/ri";
import  {Link} from 'react-router-dom'

const LoginForm = () => {
    return (
        <div className="row  register__row login__row">
           
            <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                <InputGroup className="mb-2">
                    <InputGroup.Text><AiOutlineMail className="svgColor" /></InputGroup.Text>
                    <FormControl id="email" placeholder="Email" />
                </InputGroup>
            </div>
            <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                <InputGroup className="mb-2">
                    <InputGroup.Text><RiLockPasswordLine className="svgColor" /></InputGroup.Text>
                    <FormControl id="name" type="password" placeholder="Password" />
                </InputGroup>
            </div>

            <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                <div className="row" style={{ width: "100%", justifyContent: "space-between" }}>
                    <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__left"><Link to="/"><button className="register__btn ">Cancel</button></Link></div>
                    <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__right"><button className="register__btn ">Sign-in</button></div>

                </div>
            </div>
            
            <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                <div className="row" style={{ width: "100%", justifyContent: "space-between" }}>
                    <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__left"><button className="register__btn extra__link__login">Forgot Passsword</button></div>
                    <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__right"><Link to="/register"><button className="register__btn extra__link__login">Register</button></Link></div>

                </div>
            </div>
        </div>
    )
}

export default LoginForm