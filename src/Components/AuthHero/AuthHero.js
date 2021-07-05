import React from 'react';
import './AuthHero.css';
import { Container } from 'react-bootstrap';
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";

const AuthHero = (props) => {
    return (
        <div className="auth__hero__outer__div">
            <Container>
                <div className="auth__hero__inner__div">
                   
                    <div className="description__div">
                        <div className="heading">
                            <p>{props.heading}</p>
                        </div>

                        <div className="auth__form__div">
                        {props.form} 
                        </div>

                        <div className="auth__social__login">
                            <div className="auth__social__login__heading">
                                Login with
                            </div>
                            <div className="auth__social__login__handle">
                                <div className="row auth__social__login__row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 auth__social__login__div__fb">
                                        <button><FaFacebookF /> Login with Facebook</button>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 auth__social__login__div__gl">
                                        <button><FaGooglePlusG /> Sign in with Google+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </Container>
        </div>
    )
}

export default AuthHero
