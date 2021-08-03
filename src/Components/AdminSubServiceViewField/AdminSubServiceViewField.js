import React, { useState, useEffect } from 'react'
import './AdminSubServiceViewField.css'
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { Link, useParams } from 'react-router-dom'
import { BiBlock } from "react-icons/bi";
import { VscVmActive } from "react-icons/vsc";
import { toastStart, toastEnd } from "../../features/toasterSlice"

const AdminSubServiceViewField = () => {

    const [navServices, setNavServices] = useState([]);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [field_type, setField_type] = useState("email");
    const [field_name, setField_name] = useState("");

    const dispatch = useDispatch();
    const { sub_service_id } = useParams();

    const adminUser = useSelector(selectAdminUser)
    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };


    useEffect(() => {
        dispatch(show())

        axios.get(`/api/form-field/view-all`, config)
            .then((response) => {
                setNavServices(response.data.result)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })

    }, [dispatch, sub_service_id])





    const fieldNameHandler = (e) => {
        setField_name(e.target.value)
    }

    const fieldTypeHandler = (e) => {
        setField_type(e.target.value)
    }

    const serviceFormHandler = (e) => {
        e.preventDefault();
        setError(false)
        setErrorMessage("")

        if (field_name.length === 0) {
            setError(true)
            setErrorMessage("All fields are required")
        } else {

            const formData = new FormData()
            formData.append('field_name', field_name)
            formData.append('field_type', field_type)
            dispatch(show())

            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post(`/api/form-field/create/`, formData, config)
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
                                axios.get(`/api/form-field/view-all`, config)
                                    .then((response) => {

                                        setNavServices(response.data.result)
                                        dispatch(hide())
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                        dispatch(hide())
                                    })
                                setField_name("");
                                setField_type("email");
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
                                <label htmlFor="field_name">Field Name</label>
                                <input type="text" className="form-control" id="field_name" placeholder="Enter Field Name" value={field_name} onChange={fieldNameHandler} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="field_type">Field Type</label>
                                <select className="form-control" id="field_type" value={field_type} onChange={fieldTypeHandler}>
                                    <option value="email">Email</option>
                                    <option value="text">Text</option>
                                    <option value="description">Description</option>
                                    <option value="number">Number</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="date">Date</option>
                                    <option value="attatchment">Attatchment</option>


                                </select>
                            </div>



                            <button type="submit" className="btn btn-primary card__btn">Create</button>
                        </form>
                    </div>
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                    <div className="row">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" >Field Name</th>
                                    <th scope="col" >Field Type</th>
                                    <th scope="col" >Database Column Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    navServices.length > 0 ?
                                        navServices.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.field_name}</td>
                                                    <td>{item.field_type}</td>
                                                    <td>{item.field_column_name}</td>
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

export default AdminSubServiceViewField