import React from 'react'
import AdminNavBar from '../../Components/AdminNavBar/AdminNavBar'
import AdminSideNav from '../../Components/AdminSideNav/AdminSideNav'
import AdminRightMain from '../../Components/AdminRightMain/AdminRightMain'
import AdminServiceView from '../../Components/AdminServiceView/AdminServiceView'
import AdminServiceCreate from '../../Components/AdminServiceCreate/AdminServiceCreate'
import {useParams} from 'react-router-dom';

const AdminServiceDashboard = () => {



    const {type} = useParams();

    const serviceViewiewHandler = () => {
        if(type==="create"){
            return (<AdminServiceCreate />);
        }else if(type==="view"){
            return (<AdminServiceView />);
        }
    }

    return (
        <div>
            <AdminNavBar />
            <div className="row" style={{ width: "100%" }}>
                <AdminSideNav activeClass="service" activeSubClass={type} />
                <AdminRightMain>
                    {/* Dynamic Main Board View*/}
                    
                    {serviceViewiewHandler()}
                </AdminRightMain>
            </div>

        </div>
    )
}

export default AdminServiceDashboard
