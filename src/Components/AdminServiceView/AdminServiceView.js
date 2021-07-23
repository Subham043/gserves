import React, { useState, useEffect } from 'react'
import './AdminServiceView.css'
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"
import { useDispatch } from "react-redux"
import {Link} from 'react-router-dom'

const AdminServiceView = () => {

    const [navServices, setNavServices] = useState([]);

    const dispatch = useDispatch();



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

    
    return (
        <div className="admin__right__main__service__view">
            <div className="create__btn__div">
                <Link to="/admin/service/create" className="btn btn-primary card__btn">Create New Service</Link>
            </div>
            <div className="row">
                {
                    navServices.map((item) => {
                        return (
                            <div key={item.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                                <div className="card" style={{ width: "100%" }}>
                                    <img className="card-img-top" src={`http://127.0.0.1:8000/service/logo/${item.logo}`} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">Rs. {item.price}</p>
                                        <div style={{textAlign:"center"}}>
                                            <button className="btn btn-primary card__btn">Edit</button>
                                            <button className="btn btn-primary card__btn">Delete</button>
                                            <button className="btn btn-primary card__btn">View Sub-Services</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    )
}

export default AdminServiceView
