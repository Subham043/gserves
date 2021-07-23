import React, {useRef} from 'react'
import './AdminSideNav.css'
import { selectAdminNav } from "../../features/adminNavSlice"
import { useSelector } from "react-redux"
import {Link} from "react-router-dom"


const AdminSideNav = (props) => {

    const minMenuRef = useRef([]);
    const subMenuRef = useRef([]);

    
    const SubMenuHandler = (value) => {
        minMenuRef.current.map((i)=>{
            return (i.classList.remove('active'))
        })
        subMenuRef.current.map((i)=>{
            return (i.style.display = "none")
        })
        minMenuRef.current[value].classList.add('active')
        subMenuRef.current[value].style.display = "block"
    }

    const adminNav = useSelector(selectAdminNav)
    


    
    

    return (
        <div className="admin__left__side__nav" style={{display:adminNav === true ? "block" : "none"}}>
            <div className="admin__left__side__nav__menu">
                <ul className="main__ul">
                    <li><Link to="/admin/dashboard/" className={props.activeClass === "dashboard" ? "active__class__handler active" : "active__class__handler"}  >Dashboard</Link></li>
                    <li>
                        <button className={props.activeClass === "service" ? "active__class__handler active" : "active__class__handler"}  ref={el => minMenuRef.current[0] = el} onClick={()=>SubMenuHandler(0)} >Services</button>
                        <ul className="sub__menu__side__nav__ul"   ref={el => subMenuRef.current[0] = el} style={{position:"relative", display: props.activeClass === "service" ?"block":"none"}}>
                            <li className="sub__menu__side__nav__li"><Link to="/admin/service/create" className={props.activeSubClass === "create" ? "sub__menu__side__nav__button ball__line" : "sub__menu__side__nav__button"} >Create</Link></li>
                            <li className="sub__menu__side__nav__li"><Link to="/admin/service/view" className={props.activeSubClass === "view" ? "sub__menu__side__nav__button ball__line" : "sub__menu__side__nav__button"} >View</Link></li>
                        </ul>
                    </li>
                    <li>
                        <button className={props.activeClass === "payment" ? "active__class__handler active" : "active__class__handler"}  ref={el => minMenuRef.current[1] = el} onClick={()=>SubMenuHandler(1)} >Payment</button>
                        <ul className="sub__menu__side__nav__ul"   ref={el => subMenuRef.current[1] = el} style={{position:"relative", display: props.activeClass === "payment" ?"block":"none"}}>
                            <li className="sub__menu__side__nav__li"><Link to="/admin/service/create" className={props.activeSubClass === "payment" ? "sub__menu__side__nav__button ball__line" : "sub__menu__side__nav__button"}  >Create</Link></li>
                            <li className="sub__menu__side__nav__li"><Link to="/admin/service/view" className={props.activeSubClass === "payment" ? "sub__menu__side__nav__button ball__line" : "sub__menu__side__nav__button"} >View</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AdminSideNav
