import React, { useState } from 'react'
import { Container, InputGroup, FormControl } from 'react-bootstrap'
import { AiOutlineMail, AiOutlineMobile, AiOutlineUser } from "react-icons/ai";
import { BiMessageCheck } from "react-icons/bi";
import { GrSend } from "react-icons/gr";
import "./Contact.css";
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { useDispatch } from 'react-redux'
import axios from "../../axios"

const Contact = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        setError(false)
        setErrorMessage("")

        if (name.length === 0 || email.length === 0 || phone.length === 0 || message.length === 0) {
            setError(true)
            setErrorMessage("All fields are required")
        }else{
            let form = {}
            form['name'] = name
            form['email'] = email
            form['phone'] = phone
            form['message'] = message
            
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post(`/api/contact/create/`, form)
                        .then((response) => {
                            if (response.data.result) {
                                
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
                                setMessage("");
                            } else if (response.data.error) {
                                setError(true)
                                setErrorMessage(response.data.error)
                                
                            }
                            else if (response.data.name) {
                                setError(true)
                                setErrorMessage(response.data.name)
                                
                            }
                            else if (response.data.email) {
                                setError(true)
                                setErrorMessage(response.data.email)
                                
                            }
                            else if (response.data.phone) {
                                setError(true)
                                setErrorMessage(response.data.phone)
                                
                            }
                            else if (response.data.message) {
                                setError(true)
                                setErrorMessage(response.data.message)
                                
                            }

                        })
                        .catch(error => {
                            console.log(error)
                            
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
        <div className="contact__form">
            <Container>
                <div className="outer__form__container">
                    <div className="contact__form__heading">
                        Get in touch
                    </div>
                    <form style={{ width: "100%" }} onSubmit={submitHandler}>
                        <div className="row">
                            {error === true ?
                                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                                    <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div>
                                </div>
                                :
                                null
                            }

                            <div className="col-xl-4 col-lg-4 col-sm-12 form__row">
                                <InputGroup className="mb-2">
                                    <InputGroup.Text><AiOutlineUser className="svgColor" /></InputGroup.Text>
                                    <FormControl id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                </InputGroup>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-sm-12 form__row">
                                <InputGroup className="mb-2">
                                    <InputGroup.Text><AiOutlineMobile className="svgColor" /></InputGroup.Text>
                                    <FormControl id="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </InputGroup>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-sm-12 form__row">
                                <InputGroup className="mb-2">
                                    <InputGroup.Text><AiOutlineMail className="svgColor" /></InputGroup.Text>
                                    <FormControl id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </InputGroup>
                            </div>
                            <div className="col-xl-10 col-lg-10 col-sm-12 form__row">
                                <InputGroup className="mb-2">
                                    <InputGroup.Text><BiMessageCheck className="svgColor" /></InputGroup.Text>
                                    <FormControl id="message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                                </InputGroup>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-sm-12 form__row">
                                <InputGroup className="mb-2 send__inputgroup">
                                    <InputGroup.Text><GrSend className="send__svgColor" /></InputGroup.Text>
                                    <FormControl id="submit" className="send__btn" type="submit" value="send" />
                                </InputGroup>
                            </div>

                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default Contact
