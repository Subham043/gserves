import React, { useState, useEffect } from 'react'
import './AdminSubServiceCreateField.css'
import { show, hide } from "../../features/loaderModalSlice"
import axios from "../../axios"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { useParams } from 'react-router-dom'

const AdminSubServiceCreateField = () => {

    const { sub_service_id } = useParams();
    const dispatch = useDispatch();
    const adminUser = useSelector(selectAdminUser)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [field_type, setField_type] = useState("email");
    const [field_name, setField_name] = useState("");


    const fieldNameHandler = (e) => {
        setField_name(e.target.value)
    }

    const fieldTypeHandler = (e) => {
        setField_type(e.target.value)
    }




    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };






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
                                setField_name("");
                                setField_type("");
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
        <div className="admin__right__main__service__create">

            <div className="row" style={{ width: "100%", justifyContent: "center" }}>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    {/* <div className="admin__right__main__service__create__form">
                        <h2>CREATE FORM FIELD</h2>
                    </div> */}
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

            </div>
        </div>
    )
}

export default AdminSubServiceCreateField
