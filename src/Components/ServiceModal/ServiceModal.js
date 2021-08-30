import React, { useState } from 'react'
import './ServiceModal.css'
import { useSelector } from "react-redux"
import { selectServiceModal } from "../../features/serviceModalSlice"
import { AiOutlineClose } from "react-icons/ai";
import { showServiceModal,hideServiceModal } from "../../features/serviceModalSlice"
import { show, hide } from "../../features/loaderModalSlice"
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { useDispatch } from 'react-redux'
import axios from "../../axios"

const ServiceModal = () => {

    const serviceModal = useSelector(selectServiceModal)

    const dispatch = useDispatch();
    const handleCloseServiceModal = ()=> {
        dispatch(hideServiceModal())
    }

    if(serviceModal === true){
        document.querySelector('body').style.position = "fixed";
        document.querySelector('body').style.width = "100%";
    }else{
        document.querySelector('body').style.position = "static";
        document.querySelector('body').style.width = "100%";
    }

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [service, setService] = useState("")
    const [requirement_time, setRequirement_time] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();
        setError(false)
        setErrorMessage("")

        if (name.length === 0 || email.length === 0 || phone.length === 0 || requirement_time.length === 0 || service.length === 0) {
            setError(true)
            setErrorMessage("All fields are required")
        }else{
            let form = {}
            form['name'] = name
            form['email'] = email
            form['phone'] = phone
            form['service'] = service
            form['requirement_time'] = requirement_time
            dispatch(hideServiceModal())
            dispatch(show())
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post(`/api/requirement/create/`, form)
                        .then((response) => {
                            if (response.data.result) {
                                dispatch(hide())
                                dispatch(toastEnd())
                                dispatch(toastStart({
                                    toasterStatus: true,
                                    toasterMessage: response.data.result,
                                    toasterType: "success",
                                    timeline: Date().toLocaleString()
                                }))
                                dispatch(toastEnd())
                                setName("");
                                setEmail("");
                                setPhone("");
                                setService("");
                                setRequirement_time("");
                            } else if (response.data.error) {
                                setError(true)
                                setErrorMessage(response.data.error)
                                dispatch(hide())
                                dispatch(showServiceModal())
                            }
                            else if (response.data.name) {
                                setError(true)
                                setErrorMessage(response.data.name)
                                dispatch(hide())
                                dispatch(showServiceModal())
                            }
                            else if (response.data.email) {
                                setError(true)
                                setErrorMessage(response.data.email)
                                dispatch(hide())
                                dispatch(showServiceModal())
                            }
                            else if (response.data.phone) {
                                setError(true)
                                setErrorMessage(response.data.phone)
                                dispatch(hide())
                                dispatch(showServiceModal())
                            }
                            else if (response.data.service) {
                                setError(true)
                                setErrorMessage(response.data.service)
                                dispatch(hide())
                                dispatch(showServiceModal())
                            }
                            else if (response.data.requirement_time) {
                                setError(true)
                                setErrorMessage(response.data.requirement_time)
                                dispatch(hide())
                                dispatch(showServiceModal())
                            }

                        })
                        .catch(error => {
                            console.log(error)
                            dispatch(hide())
                            dispatch(showServiceModal())
                            dispatch(toastEnd())
                            dispatch(toastStart({
                                toasterStatus: true,
                                toasterMessage: "Oops! some error occured",
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
        <div>
            {serviceModal === true ?

            <div className="service__modal__div">
                <div id="modal_div" className={`${serviceModal === true ? "inner__service__modal__div inner__service__modal__div__show" : "inner__service__modal__div inner__service__modal__div__hide"}`}>
                    <div className="close__button__div">
                        <button onClick={handleCloseServiceModal}><AiOutlineClose /></button>
                    </div>
                    <div className="service__modal__form">
                        <form onSubmit={submitHandler}>
                            <h2>Mention Your Requirement</h2>
                            {error === true ?
                                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                                    <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div>
                                </div>
                                :
                                null
                            }
                            <textarea placeholder="Service" onChange={(e) => setService(e.target.value)} value={service} ></textarea>
                            <input placeholder="How soon do you require" value={requirement_time} onChange={(e) => setRequirement_time(e.target.value)} />
                            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <input placeholder="Mobile" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <button type="submit">Request Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            :
            null
            }
        </div>
    )
}

export default ServiceModal
