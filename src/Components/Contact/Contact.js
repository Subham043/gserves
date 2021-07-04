import React from 'react'
import { Container, InputGroup, FormControl } from 'react-bootstrap'
import { AiOutlineMail, AiOutlineMobile, AiOutlineUser } from "react-icons/ai";
import { BiMessageCheck } from "react-icons/bi";
import { GrSend } from "react-icons/gr";
import "./Contact.css";

const Contact = () => {
    return (
        <div className="contact__form">
            <Container>
                <div className="outer__form__container">
                    <div className="contact__form__heading">
                        Get in touch
                    </div>
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-sm-12 form__row">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><AiOutlineUser className="svgColor" /></InputGroup.Text>
                                <FormControl id="name" placeholder="Name" />
                            </InputGroup>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-sm-12 form__row">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><AiOutlineMobile className="svgColor" /></InputGroup.Text>
                                <FormControl id="phone" placeholder="Phone" />
                            </InputGroup>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-sm-12 form__row">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><AiOutlineMail className="svgColor" /></InputGroup.Text>
                                <FormControl id="email" placeholder="Email" />
                            </InputGroup>
                        </div>
                        <div className="col-xl-10 col-lg-10 col-sm-12 form__row">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><BiMessageCheck className="svgColor" /></InputGroup.Text>
                                <FormControl id="message" placeholder="Message" />
                            </InputGroup>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-12 form__row">
                            <InputGroup className="mb-2 send__inputgroup">
                                <InputGroup.Text><GrSend className="send__svgColor" /></InputGroup.Text>
                                <FormControl id="submit" className="send__btn" type="submit" value="send" />
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Contact
