import React, { useState, useEffect } from 'react'
import './AdminServiceView.css'
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { toastStart, toastEnd } from "../../features/toasterSlice"

const AdminServiceView = () => {

    const [navServices, setNavServices] = useState([]);
    
    const dispatch = useDispatch();
    const [cityList, setCityList] = useState([]);



    useEffect(() => {
        dispatch(show())
        axios.get(`/api/service/view`)
            .then((response) => {
                setNavServices(response.data.result)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })
    }, [dispatch])

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/city/view/`)
            .then((response) => {
                setCityList(response.data.result)
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
                axios.delete(`/api/service/delete/${id}`, config)
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
            <div className="create__btn__div">
                <Link to="/admin/service/create" className="btn btn-primary card__btn">Create New Department</Link>
            </div>
            <div className="row">
                {
                    navServices.length > 0 ?
                    navServices.map((item) => {
                        return (
                            <div key={item.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                                <div className="card" style={{ width: "100%" }}>
                                    <img className="card-img-top" src={`http://127.0.0.1:8000/service/logo/${item.logo}`} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.city_name}</p>
                                        <p className="card-text">http://localhost:3000/{item.url}</p>
                                        <div style={{textAlign:"center"}}>
                                            <Link to={`/admin/service/edit/${item.id}`} className="btn btn-primary card__btn">Edit</Link>
                                            <button onClick={()=>deleteHandler(item.id)} className="btn btn-primary card__btn">Delete</button>
                                            <Link to={`/admin/sub-service/view/${item.id}`} className="btn btn-primary card__btn">View Master Services</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })
                    :
                    <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 mb-4" style={{display: "grid", placeItems:"center", height: "70vh" }}>
                        <p style={{textAlign: "center" }}>No Department Available!! Please create one</p>
                    </div>
                }

            </div>
        </div>
    )
}

export default AdminServiceView
