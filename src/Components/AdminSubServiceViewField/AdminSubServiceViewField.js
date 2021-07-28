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
    const [filterList, setFilterList] = useState([]);
    const [filterValue, setFilterValue] = useState(0);

    const dispatch = useDispatch();
    const { sub_service_id } = useParams();

    const adminUser = useSelector(selectAdminUser)
    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/sub-service/view`)
            .then((response) => {
                setFilterList(response.data.result)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })
    }, [dispatch])


    useEffect(() => {
        dispatch(show())

        axios.get(`/api/sub-service-fields/view-for-admin`, config)
            .then((response) => {
                if (sub_service_id === undefined) {
                    setNavServices(response.data.result)
                    setFilterValue(0)
                } else if (sub_service_id !== undefined) {
                    let filteredFormFields = response.data.result.filter((item) => {
                        return item.sub_service_id === parseInt(sub_service_id);
                    })
                    setNavServices(filteredFormFields)
                    setFilterValue(parseInt(sub_service_id))
                }


                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })

    }, [dispatch, sub_service_id])



    const deleteHandler = (id) => {
        if (!window.confirm("Are you sure?")) {
            return false;
        } else {
            dispatch(show())
            const form = {}
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post(`/api/sub-service-fields/set-status/${id}`, form, config)
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
                                dispatch(show())
                                axios.get(`/api/sub-service-fields/view-for-admin`, config)
                                    .then((response) => {
                                        if (sub_service_id === undefined) {
                                            setNavServices(response.data.result)
                                        }else if (sub_service_id !== undefined) {
                                            let filteredFormFields = response.data.result.filter((item) => {
                                                return item.sub_service_id === parseInt(sub_service_id);
                                            })
                                            setNavServices(filteredFormFields)
                                        }


                                        dispatch(hide())
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                        dispatch(hide())
                                    })
                            } else if (response.data.error) {
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

    const setFilterValueHandler = (value) => {
        setFilterValue(value)
        if (value === 0) {
            dispatch(show())
            axios.get(`/api/sub-service-fields/view-for-admin`, config)
                .then((response) => {
                    setNavServices(response.data.result)
                    dispatch(hide())
                })
                .catch((error) => {
                    console.log(error)
                    dispatch(hide())
                })
        } else {
            dispatch(show())
            axios.get(`/api/sub-service-fields/view-for-admin`, config)
                .then((response) => {
                    let filteredFormFields = response.data.result.filter((item) => {
                        return item.sub_service_id === parseInt(value);
                    })
                    setNavServices(filteredFormFields)
                    dispatch(hide())
                })
                .catch((error) => {
                    console.log(error)
                    dispatch(hide())
                })
        }
    }


    return (
        <div className="admin__right__main__service__view">
            <div className="create__btn__div">
                <select className="form-control filter__select__style" id="field_type" value={filterValue} onChange={(e) => setFilterValueHandler(parseInt(e.target.value))}>
                    <option value="0">ALL</option>
                    {filterList.map((item) => (
                        <option value={item.id} key={item.id}>{item.name}</option>
                    ))}
                </select>
                <Link to="/admin/sub-service-field/create" className="btn btn-primary card__btn">Create Master Service Form Field</Link>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                <div className="row">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col" >#</th>
                                <th scope="col" >Action</th>
                                <th scope="col" >Field Name</th>
                                <th scope="col" >Field Type</th>
                                <th scope="col" >Database Table Name</th>
                                <th scope="col" >Master Service</th>
                                <th scope="col" >Department</th>
                                <th scope="col" >Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                navServices.length > 0 ?
                                    navServices.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <th scope="row">{index}</th>
                                                {item.status === 1 ?
                                                    <td><button type="button" onClick={() => deleteHandler(item.id)} title="inactive" className="action__button action__delete"><BiBlock /></button></td>
                                                    :
                                                    <td><button type="button" onClick={() => deleteHandler(item.id)} title="active" className="action__button action__delete" style={{ background: "green" }}><VscVmActive /></button></td>
                                                }

                                                <td>{item.field_name}</td>
                                                <td>{item.field_type}</td>
                                                <td>{item.storage_table_name}</td>
                                                <td>{item.name}</td>
                                                <td>{item.title}</td>
                                                <td>{item.status === 1 ? "Active" : "Inactive"}</td>
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
    )
}

export default AdminSubServiceViewField
