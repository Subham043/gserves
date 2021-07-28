import React from 'react'
import AdminNavBar from '../../Components/AdminNavBar/AdminNavBar'
import AdminSideNav from '../../Components/AdminSideNav/AdminSideNav'
import AdminRightMain from '../../Components/AdminRightMain/AdminRightMain'
import AdminSubServiceCreateField from '../../Components/AdminSubServiceFieldCreate/AdminSubServiceCreateField'
import AdminSubServiceViewField from '../../Components/AdminSubServiceViewField/AdminSubServiceViewField'
import {useParams} from 'react-router-dom';

const AdminSubServiceFieldDashboard = () => {



    const {type} = useParams();

    const serviceViewiewHandler = () => {
        if(type==="create"){
            return (<AdminSubServiceCreateField />);
        }else if(type==="view")
        {
            return (<AdminSubServiceViewField />);
        }
    }

    return (
        <div>
            <AdminNavBar />
            <div className="row" style={{ width: "100%" }}>
                <AdminSideNav activeClass="sub-service-field" activeSubClass={type} />
                <AdminRightMain>
                    {/* Dynamic Main Board View*/}
                    
                    {serviceViewiewHandler()}
                </AdminRightMain>
            </div>

        </div>
    )
}

export default AdminSubServiceFieldDashboard
