import React from 'react'
import { Container, Row } from 'react-bootstrap'
import "./Footer.css";
import { GrStackOverflow } from "react-icons/gr";

const Footer = () => {
    return (
        <div className="footer__div">
            <Container>
                <Row style={{justifyContent:"center"}}>
                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 footer__left__div">
                        <div className="footer__divider">
                            <div className="logo">
                                <p><GrStackOverflow /> GServes</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 footer__right__div">
                        <div className="terms">
                            Privacy Policy | Legal Info | Terms & Condition
                        </div>
                        <div className="copyright">
                                &copy; GServes 2021. All Rights Reserved
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
