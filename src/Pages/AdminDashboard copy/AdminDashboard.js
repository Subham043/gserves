import React from 'react'
import AdminNavBar from '../../Components/AdminNavBar/AdminNavBar'
import AdminSideNav from '../../Components/AdminSideNav/AdminSideNav'
import AdminRightMain from '../../Components/AdminRightMain/AdminRightMain'
import AdminServiceView from '../../Components/AdminServiceView/AdminServiceView'
import AdminServiceCreate from '../../Components/AdminServiceCreate/AdminServiceCreate'
import AdminMainDashBoard from '../../Components/AdminMainDashboard/AdminMainDashBoard'
import { selectAdminMainView } from "../../features/adminMainViewSlice"
import { useSelector } from "react-redux"

const AdminDashboard = () => {

    const adminMainView = useSelector(selectAdminMainView)

    return (
        <div>
            <AdminNavBar />
            <div className="row" style={{ width: "100%" }}>
                <AdminSideNav />
                <AdminRightMain>
                    {/* Dynamic Main Board View*/}
                    {/* {adminMainView === "AdminMainDashBoard" ? <AdminMainDashBoard /> : null}
                    {adminMainView === "AdminServiceView" ? <AdminServiceView /> : null}
                    {adminMainView === "AdminServiceCreate" ? <AdminServiceCreate /> : null} */}
                    <AdminMainDashBoard />
                </AdminRightMain>
            </div>

        </div>
    )
}

export default AdminDashboard
