import React, { useState } from 'react'
import './AdminNavBar.css'
import { GrStackOverflow } from "react-icons/gr";
import { GoThreeBars } from "react-icons/go";
import { Link, useHistory } from 'react-router-dom'
import admin from '../../Assets/admin.png'
import { AiFillSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { showNav } from "../../features/adminNavSlice"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser, loginAdmin, logoutAdmin } from "../../features/adminUserSlice"
import { toastStart, toastEnd } from "../../features/toasterSlice"
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"

const AdminNavBar = () => {

    const [showAdminRightMenu, setShowAdminRightMenu] = useState(false);

    const dispatch = useDispatch();
    let history = useHistory();

    const showSideNavHandler = () => {
        dispatch(showNav())
    }

    const adminUser = useSelector(selectAdminUser)
    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };

    const logoutHandler = () => {
        dispatch(show())
        axios.get(`/api/logout`, config)
            .then((response) => {

                if (response.data.result) {
                    localStorage.removeItem(window.btoa("admin_token"));
                    dispatch(hide())
                    dispatch(logoutAdmin())
                    dispatch(toastEnd())
                    dispatch(toastStart({
                        toasterStatus: true,
                        toasterMessage: "Successfully Loggedout",
                        toasterType: "success",
                        timeline: Date().toLocaleString()
                    }))
                    dispatch(toastEnd())
                    history.push(`/admin`);

                }

            })
            .catch((error)=>{
                console.log(error)
                dispatch(hide())
                dispatch(toastEnd())
                dispatch(toastStart({
                    toasterStatus: true,
                    toasterMessage: "Oops! some error occured",
                    toasterType: "error",
                    timeline: Date().toLocaleString()
                }))
                dispatch(toastEnd())
            })
    }

    

    return (
        <div>
            <nav className="admin__navbar">
                <div className="left__Nav">
                    <div className="nav__logo">
                        <div className="logo__div">
                            <div className="row" style={{ justifyContent: "center" }}>
                                <div className="logo">
                                    <Link to="/"><p><GrStackOverflow /> GServes</p></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav__button">
                        <button onClick={showSideNavHandler}><GoThreeBars style={{ color: "rgba(0, 160, 139, 1)" }} /></button>
                    </div>
                </div>
                <div className="Right__Nav">
                    <div className="nav__right__drop__down">
                        <button  onClick={() => setShowAdminRightMenu(!showAdminRightMenu) } ><img className="btn__img" src={admin}  /></button>
                        {showAdminRightMenu === true ?
                            <div className="dropdown_menu_admin">
                                <ul>
                                    <li><AiFillSetting /> Setting</li>
                                    <li><CgProfile /> Profile</li>
                                    <li onClick={logoutHandler}><FiLogOut /> Logout</li>
                                </ul>
                            </div>
                            : null
                        }

                    </div>
                </div>
            </nav>
        </div>

    )
}

export default AdminNavBar
