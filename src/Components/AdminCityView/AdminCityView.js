import React, { useState, useEffect } from 'react'
import './AdminCityView.css'
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { Link, useParams } from 'react-router-dom'
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { AiFillDelete } from "react-icons/ai";

const AdminCityView = () => {

    const [navServices, setNavServices] = useState([]);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [name, setName] = useState("");
    const [state, setState] = useState("");

    const dispatch = useDispatch();
    const { sub_service_id } = useParams();

    const adminUser = useSelector(selectAdminUser)
    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };


    useEffect(() => {
        dispatch(show())

        axios.get(`/api/city/view`, config)
            .then((response) => {
                setNavServices(response.data.result)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })

    }, [dispatch, sub_service_id])





    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const stateHandler = (e) => {
        setState(e.target.value)
    }

    const serviceFormHandler = (e) => {
        e.preventDefault();
        setError(false)
        setErrorMessage("")

        if (name.length === 0 || state.length === 0) {
            setError(true)
            setErrorMessage("All fields are required")
        } else {

            const formData = new FormData()
            formData.append('name', name)
            formData.append('state', state)
            dispatch(show())

            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post(`/api/city/create/`, formData, config)
                        .then((response) => {

                            if (response.data.result) {
                                dispatch(hide())
                                dispatch(toastEnd())
                                dispatch(toastStart({
                                    toasterStatus: true,
                                    toasterMessage: response.data.result,
                                    toasterType: "success",
                                    timeline: Date().toLocaleString()
                                }))
                                dispatch(toastEnd())
                                axios.get(`/api/city/view`, config)
                                    .then((response) => {

                                        setNavServices(response.data.result)
                                        dispatch(hide())
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                        dispatch(hide())
                                    })
                                setName("");
                                setState("");
                            } else if (response.data.error) {
                                setError(true)
                                setErrorMessage(response.data.error)
                                dispatch(hide())
                            }
                            else if (response.data.field_name) {
                                setError(true)
                                setErrorMessage(response.data.field_name)
                                dispatch(hide())
                            }
                            else if (response.data.field_type) {
                                setError(true)
                                setErrorMessage(response.data.field_type)
                                dispatch(hide())
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
                            dispatch(toastEnd())
                        })
                });




            setError(false)
            setErrorMessage("")
        }
    }

    const deleteHandler = (id) => {
        if (!window.confirm("Are you sure you want to delete this?")){
            return false;
          }else{
            dispatch(show())
            axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.delete(`/api/city/delete/${id}`, config)
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
            {/* <div className="create__btn__div">
               
                <Link to="/admin/sub-service-field/create" className="btn btn-primary card__btn">Create Master Service Form Field</Link>
            </div> */}
            <div className="row" style={{ width: "100%", justifyContent: "center" }}>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
                    <div className="card form__card" style={{ width: "100%" }}>
                        <form style={{ width: "100%" }} encType="multipart/form-data" onSubmit={serviceFormHandler}>
                            {error === true ?
                                <div className="col-xl-12 col-lg-12 col-sm-12 form__row">
                                    <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div>
                                </div>
                                :
                                null
                            }


                            <div className="form-group">
                                <label htmlFor="field_name">City Name</label>
                                <input type="text" className="form-control" id="field_name" placeholder="Enter City Name" value={name} onChange={nameHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="field_name">State</label>
                                <input type="text" className="form-control" id="field_name" placeholder="Enter State" value={state} onChange={stateHandler} />
                            </div>

                            <button type="submit" className="btn btn-primary card__btn">Create</button>
                        </form>
                    </div>
                </div>

                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mb-4">
                    <div className="row">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" >Action</th>
                                    <th scope="col" >Name</th>
                                    <th scope="col" >State</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    navServices.length > 0 ?
                                        navServices.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td><button type="button" onClick={() => deleteHandler(item.id)} title="delete" className="action__button action__delete"><AiFillDelete /></button></td>
                                                    <td>{item.name}</td>
                                                    <td>{item.state}</td>
                                                </tr>
                                            );
                                        })
                                        :
                                        <tr>
                                            <td colSpan="14" style={{ textAlign: "center" }}>No Fields Available!! Please create one</td>
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

export default AdminCityView
