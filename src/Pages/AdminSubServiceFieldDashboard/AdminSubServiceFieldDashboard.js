import React from 'react'
import AdminNavBar from '../../Components/AdminNavBar/AdminNavBar'
import AdminSideNav from '../../Components/AdminSideNav/AdminSideNav'
import AdminRightMain from '../../Components/AdminRightMain/AdminRightMain'
import AdminSubServiceViewField from '../../Components/AdminSubServiceViewField/AdminSubServiceViewField'
import {useParams} from 'react-router-dom';

const AdminSubServiceFieldDashboard = () => {



    const {type} = useParams();



    return (
        <div>
            <AdminNavBar />
            <div className="row" style={{ width: "100%" }}>
                <AdminSideNav activeClass="form-field" />
                <AdminRightMain>
                    {/* Dynamic Main Board View*/}
                    <AdminSubServiceViewField />
                    
                </AdminRightMain>
            </div>

        </div>
    )
}

export default AdminSubServiceFieldDashboard
