import React, { useState } from 'react'
import { InputGroup, FormControl, Spinner } from 'react-bootstrap'
import { AiOutlineMobile } from "react-icons/ai";
import '../Login/Login.css';
import { Link, useParams, useHistory } from 'react-router-dom'
import axios from "../../axios"
import { useDispatch } from "react-redux"
import { show, hide } from "../../features/loaderModalSlice"

const PhoneForm = () => {

    const dispatch = useDispatch();


    let {email} = useParams();
    let history = useHistory();

    const [phone, setPhone] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showProgress, setShowProgress] = useState(false)

    const otpSubmitHandler = async (event) => {
        event.preventDefault();
        setError(false)
        setErrorMessage("")
        

        if (phone.length === 0  ) {
            setError(true)
            setErrorMessage("All fields are required")
        }
        else {
            let formData = {
                phone: phone,
            }
            setShowProgress(true)
            dispatch(show())



            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post(`/api/social/${window.atob(email)}`, formData,)
                        .then((response) => {
                            
                            if(response.data.result){
                                setShowProgress(false)
                                dispatch(hide())
                                if(response.data.result === "Email verified"){
                                    history.push(`/`);
                                }else if(response.data.result === "User phone number saved"){
                                    history.push(`/social/otp/${window.btoa(response.data.email)}`);
                                }else if(response.data.result === "illegal email"){
                                    history.push(`/`);
                                }
                            }else if(response.data.error){
                                setError(true)
                                setErrorMessage(response.data.error)
                                setShowProgress(false)
                                dispatch(hide())
                            }
                            else if(response.data.phone){
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

                setPhone("");
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
                        <InputGroup.Text><AiOutlineMobile className="svgColor" /></InputGroup.Text>
                        <FormControl id="phone" placeholder="Phone" value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                    </InputGroup>
                </div>
                

                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                    <div className="row" style={{ width: "100%", justifyContent: "space-between" }}>
                        <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__left"><Link to="/"><button className="register__btn " type="button">Cancel</button></Link></div>
                        {showProgress?
                            <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__right"><button className="register__btn" type="button" disabled ><Spinner animation="border" variant="light" style={{width:"1.5rem", height:"1.5rem"}} /></button></div>
                            :
                            <div className="col-xl-6 col-lg-6 col-sm-12 button__row register__btn__right"><button className="register__btn" type="submit" >Submit</button></div>
                            
                        }

                    </div>
                </div>

            </form>
        </div>
    )
}

export default PhoneForm