import React from 'react'
import AdminNavBar from '../../Components/AdminNavBar/AdminNavBar'
import AdminSideNav from '../../Components/AdminSideNav/AdminSideNav'
import AdminRightMain from '../../Components/AdminRightMain/AdminRightMain'
import AdminMainDashBoard from '../../Components/AdminMainDashboard/AdminMainDashBoard'

const AdminDashboard = () => {

    


    return (
        <div>
            <AdminNavBar />
            <div className="row" style={{ width: "100%" }}>
                <AdminSideNav activeClass="dashboard" />
                <AdminRightMain>
                    <AdminMainDashBoard />
                </AdminRightMain>
            </div>

        </div>
    )
}

export default AdminDashboard
