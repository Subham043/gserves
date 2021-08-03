import React from 'react'
import AdminNavBar from '../../Components/AdminNavBar/AdminNavBar'
import AdminSideNav from '../../Components/AdminSideNav/AdminSideNav'
import AdminRightMain from '../../Components/AdminRightMain/AdminRightMain'
import AdminCityView from '../../Components/AdminCityView/AdminCityView'
import {useParams} from 'react-router-dom';

const AdminCityDashboard = () => {



    const {type} = useParams();



    return (
        <div>
            <AdminNavBar />
            <div className="row" style={{ width: "100%" }}>
                <AdminSideNav activeClass="city" />
                <AdminRightMain>
                    {/* Dynamic Main Board View*/}
                    <AdminCityView />
                    
                </AdminRightMain>
            </div>

        </div>
    )
}

export default AdminCityDashboard
