import React, {useEffect} from 'react'
import AdminNavBar from '../../Components/AdminNavBar/AdminNavBar'
import AdminSideNav from '../../Components/AdminSideNav/AdminSideNav'
import AdminRightMain from '../../Components/AdminRightMain/AdminRightMain'
import AdminSubServiceView from '../../Components/AdminSubServiceView/AdminSubServiceView'
import AdminSubServiceCreate from '../../Components/AdminSubServiceCreate/AdminSubServiceCreate'
import AdminSubServiceEdit from '../../Components/AdminSubServiceEdit/AdminSubServiceEdit'
import AdminSubServiceDisplay from '../../Components/AdminSubServiceDisplay/AdminSubServiceDisplay'
import AdminServiceFieldLink from '../../Components/AdminServiceFieldLink/AdminServiceFieldLink'
import {useParams} from 'react-router-dom';
import axios from "../../axios"
import { selectAdminUser, loginAdmin, logoutAdmin } from "../../features/adminUserSlice"
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'

const AdminServiceDashboard = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(async () => {

        try {
          if (localStorage.getItem(window.btoa("admin_token")) !== null) {
            let adminUserTokenCheck = window.atob(localStorage.getItem(window.btoa("admin_token")));
            if (adminUserTokenCheck !== null) {
    
              try {
                const config = {
                  headers: { Authorization: `Bearer ${adminUserTokenCheck}` }
                };
                const resp = await axios.get(`/api/admin/check/`, config);
                if (resp.data.error) {
                  dispatch(logoutAdmin())
                  localStorage.removeItem(window.btoa("admin_token"));
                  history.push("/admin")
                }
              } catch (err) {
                // Handle Error Here
                console.error(err);
                dispatch(logoutAdmin())
                localStorage.removeItem(window.btoa("admin_token"));
                history.push("/admin")
              }
                
            }
    
          }
    
        } catch (e) {
          console.log("admin : "+ e)
          localStorage.clear();
          dispatch(logoutAdmin())
        }
    
    
      }, [dispatch]);



    const {type} = useParams();

    const serviceViewiewHandler = () => {
        if(type==="create"){
            return (<AdminSubServiceCreate />);
        }else if(type==="view"){
            return (<AdminSubServiceView />);
        }else if(type==="edit"){
            return (<AdminSubServiceEdit />);
        }else if(type==="display"){
            return (<AdminSubServiceDisplay />);
        // }else if(type==="fields"){
        //     return (<AdminServiceFieldLink />);
        // }
        }else if(type==="fields"){
            return (<AdminServiceFieldLink />);
        }
    }

    return (
        <div>
            <AdminNavBar />
            <div className="row" style={{ width: "100%" }}>
                <AdminSideNav activeClass="sub-service" activeSubClass={type} />
                <AdminRightMain>
                    {/* Dynamic Main Board View*/}
                    
                    {serviceViewiewHandler()}
                </AdminRightMain>
            </div>

        </div>
    )
}

export default AdminServiceDashboard
