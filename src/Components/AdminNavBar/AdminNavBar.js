import React, { useState } from 'react'
import './AdminNavBar.css'
import { GrStackOverflow } from "react-icons/gr";
import { GoThreeBars } from "react-icons/go";
import { Link } from 'react-router-dom'
import admin from '../../Assets/admin.png'
import { AiFillSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { showNav } from "../../features/adminNavSlice"
import { useDispatch } from "react-redux"

const AdminNavBar = () => {

    const [showAdminRightMenu, setShowAdminRightMenu] = useState(false);

    const dispatch = useDispatch();

    const showSideNavHandler = () => {
        dispatch(showNav())
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
                                    <li><FiLogOut /> Logout</li>
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
