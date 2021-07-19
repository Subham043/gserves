import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import "./Navbar.css"
import { FaUserAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { GoLocation } from "react-icons/go";
import { GrStackOverflow } from "react-icons/gr";
import { BiExit } from "react-icons/bi";
import { Link, useHistory } from 'react-router-dom';
import { selectUser, logout } from "../../features/userSlice"
import { show, hide } from "../../features/loaderModalSlice"
import { useSelector, useDispatch } from "react-redux"
import axios from "../../axios"
import 'rsuite/dist/styles/rsuite-default.css';
import { Dropdown } from 'rsuite';

const Navbar = () => {



    const user = useSelector(selectUser)

    const dispatch = useDispatch();

    let history = useHistory();
    const config = {
        headers: { Authorization: `Bearer ${user}` }
    };

    const logoutHandler = () => {
        dispatch(show())
        axios.get(`/api/logout`, config)
            .then((response) => {

                if (response.data.result) {
                    dispatch(logout())
                    localStorage.removeItem("token");
                    dispatch(hide())
                    history.push(`/`);

                }

            })
            .catch((error)=>{
                console.log(error)
            })

    }

    const [navServices, setNavServices] = useState([]);

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/service/view`, config)
            .then((response) => {
                setNavServices(response.data.result)
                dispatch(hide())
            })
            .catch((error)=>{
                console.log(error)
                dispatch(hide())
            })
    }, [])

    const [subNavServices, setSubNavServices] = useState([]);

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/sub-service/view`, config)
            .then((response) => {
                setSubNavServices(response.data.result)
                dispatch(hide())
            })
            .catch((error)=>{
                console.log(error)
                dispatch(hide())
            })
    }, [])

    
    let subServ = []
    let nonSubServ = []
    let obj = {}
    for (let i = 0; i < navServices.length; i++) {
        obj.id = navServices[i].id
        obj.title = navServices[i].title
        obj.logo = navServices[i].logo
        obj.price = navServices[i].price
        for (let j = 0; j < subNavServices.length; j++) {
            if (subNavServices[j].service_id === navServices[i].id) {
                nonSubServ.push(subNavServices[j])
            }
        }
        if (nonSubServ.length !== 0) {
            obj.sub_services = nonSubServ
            nonSubServ = [];
        } else {
            obj.sub_services = null
            nonSubServ = [];
        }
        subServ.push(obj);
        obj = {};

    }
    



    return (
        <nav className="navBar">
            <Container>
                <div className="desktop__nav">
                    <div className="row">
                        <div className="dropdown__div">
                            <div className="row" style={{ justifyContent: "space-evenly" }}>
                                <div className="services_div">
                                    <div>



                                        <Dropdown className="dropdown__btn" title="Services" icon={<GoThreeBars style={{ color: "rgba(0, 160, 139, 1)" }} />} >
                                            
                                            {subServ.map(item => {
                                                if (item.sub_services != null) {
                                                   
                                                    return (<Dropdown.Menu title={item.title} key={item.id}>
                                                        {item.sub_services.map(innerElement => (
  
                                                               <Dropdown.Item eventKey="e-1" key={innerElement.id}> {innerElement.name}</Dropdown.Item>
                                                               
                                                            
                                                      ))}</Dropdown.Menu>)

                                                } else {
                                                    return (<Dropdown.Item eventKey="a" key={item.id}>{item.title}</Dropdown.Item>)
                                                }


                                            })}
                                        </Dropdown>


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
                            {user === null ?
                                <div className="row" style={{ justifyContent: "space-evenly" }}>

                                    <div className="register_div">
                                        <Link to="/register"><button><FaRegEdit style={{ color: "rgba(0, 160, 139, 1)" }} /> Register</button></Link>
                                    </div>
                                    <div className="login_div">
                                        <Link to="/login"><button><FaUserAlt style={{ color: "rgba(0, 160, 139, 1)" }} /> Login</button></Link>
                                    </div>
                                </div>
                                :
                                <div className="row" style={{ justifyContent: "space-evenly" }}>

                                    <div className="register_div">
                                        <Link to="/"><button><FaUserAlt style={{ color: "rgba(0, 160, 139, 1)" }} /> Profile</button></Link>
                                    </div>
                                    <div className="login_div">
                                        <button onClick={logoutHandler}><BiExit style={{ color: "rgba(0, 160, 139, 1)" }} /> Logout</button>
                                    </div>
                                </div>
                            }

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
                                        <Link to="/"><button><FaRegEdit style={{ color: "rgba(0, 160, 139, 1)" }} /> Register</button></Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="login_div">
                                        <Link to="/"><button><FaUserAlt style={{ color: "rgba(0, 160, 139, 1)" }} /> Login</button></Link>
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
                                               
                                                <Dropdown className="dropdown__btn" title="Services" icon={<GoThreeBars style={{ color: "rgba(0, 160, 139, 1)" }} />} >
                                            
                                            {subServ.map(item => {
                                                if (item.sub_services != null) {
                                                   
                                                    return (<Dropdown.Menu title={item.title} key={item.id}>
                                                        {item.sub_services.map(innerElement => (
  
                                                               <Dropdown.Item eventKey="e-1" key={innerElement.id}> {innerElement.name}</Dropdown.Item>
                                                               
                                                            
                                                      ))}</Dropdown.Menu>)

                                                } else {
                                                    return (<Dropdown.Item eventKey="a" key={item.id}>{item.title}</Dropdown.Item>)
                                                }


                                            })}
                                        </Dropdown>
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
