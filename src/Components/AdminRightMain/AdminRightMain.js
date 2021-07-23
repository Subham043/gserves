import React from 'react'
import './AdminRightMain.css'
import { selectAdminNav } from "../../features/adminNavSlice"
import { useSelector } from "react-redux"

const AdminRightMain = (props) => {

    const adminNav = useSelector(selectAdminNav)

    return (
        <div className={adminNav===true ? "admin__right__side__main__half" : "admin__right__side__main__full"}>
            {props.children}
            
        </div>
    )
}

export default AdminRightMain
