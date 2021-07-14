import React from 'react';
import './AuthHero.css';
import { Container } from 'react-bootstrap';
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { useDispatch } from "react-redux"
import { show, hide } from "../../features/loaderModalSlice"
import axios from '../../axios'
import { useHistory } from 'react-router-dom';
import { login } from '../../features/userSlice'

const AuthHero = (props) => {

    const dispatch = useDispatch();
    let history = useHistory();

    const responseFacebook = (response) => {
        console.log(response);
    }
    const responseGoogle = (response) => {
        
        let formData = {
            first_name: response.profileObj.givenName,
            last_name: response.profileObj.familyName,
            email: response.profileObj.email,
            social_id: response.profileObj.googleId,
        }
        dispatch(show())



        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post('/api/social', formData,)
                    .then((response) => {

                        if (response.data.result) {
                            dispatch(hide())
                            if(response.data.result === "user created"){
                                history.push(`/phone/${window.btoa(response.data.email)}`);
                            }else if(response.data.result === "Email not verified"){
                                history.push(`/phone/${response.data.email}`);
                            }else if(response.data.result === "Email verified"){
                                dispatch(login(response.data.token))
                                localStorage.setItem("token", response.data.token);
                                 history.push(`/`);
                            }
                           
                        } 
                        else if (response.data.error) {
                            dispatch(hide())
                            console.log(response.data.error);
                        }
                        
                    })
                    .catch(error => {
                        dispatch(hide())
                        console.log(error)
                    })
            });


    }

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
                                        
                                        <FacebookLogin
                                            appId="243650663974641"
                                            autoLoad={false}
                                            fields="name,email,picture"
                                            callback={responseFacebook}
                                            cssClass="my-facebook-button-class"
                                            icon={<FaFacebookF />} />
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 auth__social__login__div__gl">
                                        
                                        <GoogleLogin
                                        clientId="947352996606-cpgd9v7d5o2867eim535oug4jeoe2lr3.apps.googleusercontent.com"
                                        render={renderProps => (
                                            <button onClick={renderProps.onClick} disabled={renderProps.disabled}><FaGooglePlusG /> Sign in with Google+</button>
                                          )}
                                        buttonText="Sign in with Google+"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={`single_host_origin`}
                                        />
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
