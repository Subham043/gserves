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
                    <li><Link to="/admin/city/" className={props.activeClass === "city" ? "active__class__handler active" : "active__class__handler"}  >City</Link></li>
                    <li>
                        <button className={props.activeClass === "service" ? "active__class__handler active" : "active__class__handler"}  ref={el => minMenuRef.current[0] = el} onClick={()=>SubMenuHandler(0)} >Department</button>
                        <ul className="sub__menu__side__nav__ul"   ref={el => subMenuRef.current[0] = el} style={{position:"relative", display: props.activeClass === "service" ?"block":"none"}}>
                            <li className="sub__menu__side__nav__li"><Link to="/admin/service/create" className={props.activeClass === "service" && props.activeSubClass === "create" ? "sub__menu__side__nav__button ball__line" : "sub__menu__side__nav__button"} >Create Department</Link></li>
                            <li className="sub__menu__side__nav__li"><Link to="/admin/service/view" className={props.activeClass === "service" && props.activeSubClass === "view" ? "sub__menu__side__nav__button ball__line" : "sub__menu__side__nav__button"} >View Department</Link></li>
                        </ul>
                    </li>
                    <li>
                        <button className={props.activeClass === "sub-service" ? "active__class__handler active" : "active__class__handler"}  ref={el => minMenuRef.current[1] = el} onClick={()=>SubMenuHandler(1)} >Master Service</button>
                        <ul className="sub__menu__side__nav__ul"   ref={el => subMenuRef.current[1] = el} style={{position:"relative", display: props.activeClass === "sub-service" ?"block":"none"}}>
                            <li className="sub__menu__side__nav__li"><Link to="/admin/sub-service/create" className={props.activeClass === "sub-service" && props.activeSubClass === "create" ? "sub__menu__side__nav__button ball__line" : "sub__menu__side__nav__button"}  >Create Master Service</Link></li>
                            <li className="sub__menu__side__nav__li"><Link to="/admin/sub-service/view" className={props.activeClass === "sub-service" && props.activeSubClass === "view" ? "sub__menu__side__nav__button ball__line" : "sub__menu__side__nav__button"} >View Master Service</Link></li>
                        </ul>
                    </li>
                    <li>
                        <button className={props.activeClass === "form-field" ? "active__class__handler active" : "active__class__handler"}  ref={el => minMenuRef.current[2] = el} onClick={()=>SubMenuHandler(2)} >Master Field</button>
                        <ul className="sub__menu__side__nav__ul"   ref={el => subMenuRef.current[2] = el} style={{position:"relative", display: props.activeClass === "form-field" ?"block":"none"}}>
                            <li className="sub__menu__side__nav__li"><Link to="/admin/form-field/create" className={props.activeClass === "form-field" && props.activeSubClass === "create" ? "sub__menu__side__nav__button ball__line" : "sub__menu__side__nav__button"}  >Create Master Field</Link></li>
                            <li className="sub__menu__side__nav__li"><Link to="/admin/form-field/view" className={props.activeClass === "form-field" && props.activeSubClass === "view" ? "sub__menu__side__nav__button ball__line" : "sub__menu__side__nav__button"} >View Master Field</Link></li>
                        </ul>
                    </li>
                    <li>
                        <button className={props.activeClass === "testimonial" ? "active__class__handler active" : "active__class__handler"}  ref={el => minMenuRef.current[3] = el} onClick={()=>SubMenuHandler(3)} >Testimonial</button>
                        <ul className="sub__menu__side__nav__ul"   ref={el => subMenuRef.current[3] = el} style={{position:"relative", display: props.activeClass === "testimonial" ?"block":"none"}}>
                            <li className="sub__menu__side__nav__li"><Link to="/admin/testimonial/create" className={props.activeClass === "testimonial" && props.activeSubClass === "create" ? "sub__menu__side__nav__button ball__line" : "sub__menu__side__nav__button"}  >Create Testimonial</Link></li>
                            <li className="sub__menu__side__nav__li"><Link to="/admin/testimonial/view" className={props.activeClass === "testimonial" && props.activeSubClass === "view" ? "sub__menu__side__nav__button ball__line" : "sub__menu__side__nav__button"} >View Testimonial</Link></li>
                        </ul>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}

export default AdminSideNav
