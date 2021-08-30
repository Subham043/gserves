import React from 'react'
import AdminNavBar from '../../Components/AdminNavBar/AdminNavBar'
import AdminSideNav from '../../Components/AdminSideNav/AdminSideNav'
import AdminRightMain from '../../Components/AdminRightMain/AdminRightMain'
import AdminFormFieldView from '../../Components/AdminFormFieldView/AdminFormFieldView'
import AdminFormFieldCreate from '../../Components/AdminFormFieldCreate/AdminFormFieldCreate'
import {useParams} from 'react-router-dom';

const AdminSubServiceFieldDashboard = () => {



    const {type} = useParams();

    const serviceViewiewHandler = () => {
        if(type==="view"){
            return (<AdminFormFieldView />);
        }else if(type==="create"){
            return (<AdminFormFieldCreate />);
        }
    }



    return (
        <div>
            <AdminNavBar />
            <div className="row" style={{ width: "100%" }}>
                <AdminSideNav activeClass="form-field" activeSubClass={type} />
                <AdminRightMain>
                    {/* Dynamic Main Board View*/}
                    {serviceViewiewHandler()}
                    
                </AdminRightMain>
            </div>

        </div>
    )
}

export default AdminSubServiceFieldDashboard
