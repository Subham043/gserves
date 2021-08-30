import React, { useState, useEffect } from 'react'
import './AdminTestimonialView.css'
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const AdminTestimonialView = () => {

    const [navServices, setNavServices] = useState([]);
    
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(show())
        axios.get(`/api/testimonial/view`)
            .then((response) => {
                
                setNavServices(response.data.result)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })
    }, [dispatch])



    const adminUser = useSelector(selectAdminUser)
    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };

    const deleteHandler = (id) => {
        if (!window.confirm("Are you sure you want to delete this?")){
            return false;
          }else{
            dispatch(show())
            axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.delete(`/api/testimonial/delete/${id}`, config)
                    .then((response) => {
                        
                        if(response.data.result){
                            dispatch(hide())
                            dispatch(toastEnd())
                            dispatch(toastStart({
                                toasterStatus: true,
                                toasterMessage: response.data.result,
                                toasterType: "success",
                                timeline: Date().toLocaleString()
                            }))
                            dispatch(toastEnd())
                            let newnavServices = navServices.filter((item)=>{
                                return item.id !== id;
                            })
                            setNavServices(newnavServices)
                        }else if(response.data.error){
                            dispatch(hide())
                            dispatch(toastEnd())
                            dispatch(toastStart({
                                toasterStatus: true,
                                toasterMessage: response.data.error,
                                toasterType: "error",
                                timeline: Date().toLocaleString()
                            }))
                            dispatch(toastEnd())
                        }
                        
                    })
                    .catch(error => {
                        console.log(error)
                        dispatch(hide())
                        dispatch(toastEnd())
                        dispatch(toastStart({
                            toasterStatus: true,
                            toasterMessage: "Oops! some error occured",
                            toasterType: "error",
                            timeline: Date().toLocaleString()
                        }))
                    })
            });
          }
    }

    



    
    return (
        <div className="admin__right__main__service__view">
            <div className="admin__right__main__service__view__form">
                        <h2>VIEW TESTIMONIAL</h2>
                    </div>
            <div className="create__btn__div">
                <Link to="/admin/testimonial/create" className="btn btn-primary card__btn">Create New Testimonial</Link>
            </div>
            <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                    <div className="row">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" >#</th>
                                    
                                    <th scope="col" >Name</th>
                                    <th scope="col" >Description</th>
                                    <th scope="col" >Image</th>
                                    <th scope="col" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    navServices.length > 0 ?
                                        navServices.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{index}</td>
                                                    
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td><img className="card-img-top" src={`http://127.0.0.1:8000/testimonial/${item.image}`} alt="Card image cap" style={{maxWidth:"70px", display:"inline"}} /></td>
                                                    <td><Link to={`/admin/testimonial/edit/${item.id}`} className="action__button action__edit testimonial__page__edit" title="edit"><AiFillEdit /></Link> <button type="button" onClick={() => deleteHandler(item.id)} title="delete" className="action__button action__delete testimonial__page__delete"><AiFillDelete /></button></td>
                                                </tr>
                                            );
                                        })
                                        :
                                        <tr>
                                            <td colSpan="14" style={{ textAlign: "center" }}>No Testimonial Available!! Please create one</td>
                                        </tr>
                                }

                            </tbody>
                        </table>

                    </div>


                </div>
                

            </div>
        </div>
    )
}

export default AdminTestimonialView
