import React from 'react'
import { Container } from 'react-bootstrap';
import "./Navbar.css"
import { FaUserAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { GoLocation } from "react-icons/go";
import { GrStackOverflow } from "react-icons/gr";
import {Link} from 'react-router-dom';

const Navbar = () => {






    return (
        <nav className="navBar">
            <Container>
                <div className="desktop__nav">
                    <div className="row">
                        <div className="dropdown__div">
                            <div className="row" style={{ justifyContent: "space-evenly" }}>
                                <div className="services_div">
                                    <div>


                                        <div className="dropdown">
                                            <button className="dropdown__btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <GoThreeBars style={{ color: "rgba(0, 160, 139, 1)" }} /> Services
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link className="dropdown-item" to="#">Action</Link>
                                                <Link className="dropdown-item" to="#">Another action</Link>
                                                <Link className="dropdown-item" to="#">Something else here</Link>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                                <div className="location_div">

                                    <button><GoLocation style={{ color: "rgba(0, 160, 139, 1)" }} /> Bengaluru</button>
                                </div>
                            </div>
                        </div>
                        <div className="logo__div">
                            <div className="row" style={{ justifyContent: "center" }}>
                                <div className="logo">
                                <Link to="/"><p><GrStackOverflow /> GServes</p></Link>
                                </div>
                            </div>
                        </div>
                        <div className="auth__div">
                            <div className="row" style={{ justifyContent: "space-evenly" }}>
                                <div className="register_div">
                                    <Link to="/register"><button><FaRegEdit style={{ color: "rgba(0, 160, 139, 1)" }} /> Register</button></Link>
                                </div>
                                <div className="login_div">
                                <Link to="/login"><button><FaUserAlt style={{ color: "rgba(0, 160, 139, 1)" }} /> Login</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mobile__nav">
                    <div className="navbar navbar-expand-lg navbar-light">
                        <Link className="navbar-brand" to="/"><div className="logo">
                            <p><GrStackOverflow /> GServes</p>
                        </div></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <GoThreeBars style={{ color: "rgba(0, 160, 139, 1)" }} />
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">

                                <li className="nav-item">
                                    <div className="register_div nav-link">
                                        <Link to="/register"><button><FaRegEdit style={{ color: "rgba(0, 160, 139, 1)" }} /> Register</button></Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="login_div">
                                    <Link to="/login"><button><FaUserAlt style={{ color: "rgba(0, 160, 139, 1)" }} /> Login</button></Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="location_div">

                                        <button><GoLocation style={{ color: "rgba(0, 160, 139, 1)" }} /> Bengaluru</button>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <div className="services_div">
                                        <div>


                                            <div className="dropdown">
                                                <button className="dropdown__btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <GoThreeBars style={{ color: "rgba(0, 160, 139, 1)" }} /> Services
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <Link className="dropdown-item" to="#">Action</Link>
                                                    <Link className="dropdown-item" to="#">Another action</Link>
                                                    <Link className="dropdown-item" to="#">Something else here</Link>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>
            </Container>
        </nav>
    )
}

export default Navbar
