import React from 'react'
import AdminNavBar from '../../Components/AdminNavBar/AdminNavBar'
import AdminSideNav from '../../Components/AdminSideNav/AdminSideNav'
import AdminRightMain from '../../Components/AdminRightMain/AdminRightMain'
import AdminTestimonialView from '../../Components/AdminTestimonialView/AdminTestimonialView'
import AdminTestimonialCreate from '../../Components/AdminTestimonialCreate/AdminTestimonialCreate'
import AdminTestimonialEdit from '../../Components/AdminTestimonialEdit/AdminTestimonialEdit'
import {useParams} from 'react-router-dom';

const AdminServiceDashboard = () => {



    const {type} = useParams();

    const serviceViewiewHandler = () => {
        if(type==="create"){
            return (<AdminTestimonialCreate />);
        }else if(type==="view"){
            return (<AdminTestimonialView />);
        }else if(type==="edit"){
            return (<AdminTestimonialEdit />);
        }
    }

    return (
        <div>
            <AdminNavBar />
            <div className="row" style={{ width: "100%" }}>
                <AdminSideNav activeClass="testimonial" activeSubClass={type} />
                <AdminRightMain>
                    {/* Dynamic Main Board View*/}
                    
                    {serviceViewiewHandler()}
                </AdminRightMain>
                
            </div>

        </div>
    )
}

export default AdminServiceDashboard
