import React, { useState, useEffect } from 'react'
import './AdminFormFieldView.css'
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { useParams } from 'react-router-dom'
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom'

const AdminFormFieldView = () => {

    const [navServices, setNavServices] = useState([]);
    const [helperNavServices, setHelperNavServices] = useState([]);
    const [search, setSearch] = useState('');

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
                setHelperNavServices(response.data.result)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })

    }, [dispatch])

    const operatorHandler = (value) => {
        if (value === "===") {
            return "Equal To"
        } else if (value === "!==") {
            return "Not Equal To"
        } else if (value === "<") {
            return "Less Than"
        }
        else if (value === ">") {
            return "Greater Than"
        }
        else if (value === "<=") {
            return "Less Than Equal To"
        }
        else if (value === ">=") {
            return "Greater Than Equal To"
        }
    }

    const deleteHandler = (id) => {
        if (!window.confirm("Are you sure you want to delete this?")) {
            return false;
        } else {
            dispatch(show())
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.delete(`/api/form-field/delete/${id}`, config)
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
                                let newnavServices = navServices.filter((item) => {
                                    return item.id !== id;
                                })
                                setNavServices(newnavServices)
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

    const searchHandler = (e) =>{
        setSearch(e.target.value)
        if (e.target.value.length === 0) {
            setNavServices(helperNavServices)
        } else {
            let filteredFormFields = helperNavServices.filter((item) => {
                return (item.field_name).toLowerCase().includes((e.target.value).toLowerCase()) || (item.display_name).toLowerCase().includes((e.target.value).toLowerCase()) || (item.field_type).toLowerCase().includes((e.target.value).toLowerCase());
            })
            setNavServices(filteredFormFields)
                
        }
        
    }




    return (
        <div className="admin__right__main__service__view form__field__view">
            {/* <div className="create__btn__div">
               
                <Link to="/admin/sub-service-field/create" className="btn btn-primary card__btn">Create Master Service Form Field</Link>
            </div> */}
            <div className="row" style={{ width: "100%", justifyContent: "center" }}>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                    <div className="admin__right__main__service__view__form">
                        <h2>VIEW MASTER FIELDS</h2>
                    </div>
                    <div className="create__btn__div">
                        <div className="col-lg-2">
                            <input type="text" className="search__input" id="field_name" placeholder="Search Master Field" value={search} onChange={(e)=>{searchHandler(e)}} />
                        </div>
                        <Link to="/admin/form-field/create" className="btn btn-primary card__btn">Create Master Field</Link>
                    </div>
                    <div className="row">
                        <table className="table table-striped" style={{ borderBottom: "1px solid rgba(0,0,0,.05)" }}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" >Field Name</th>
                                    <th scope="col" >Field Type</th>
                                    <th scope="col" >Display Name</th>
                                    <th scope="col" >Choice</th>
                                    <th scope="col" >Character Length</th>
                                    <th scope="col" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    navServices.length > 0 ?
                                        navServices.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.field_name}</td>
                                                    <td>{item.field_type}</td>
                                                    <td>{item.display_name}</td>
                                                    {/* <td>{item.dependent_field_id}</td>
                                                    <td>{operatorHandler(item.operator)}</td>
                                                    <td>{item.operated_value}</td> */}
                                                    {item.choices.length > 0 ?
                                                        <td>{
                                                            item.choices.map((choice_item) => (
                                                                <span key={choice_item.id}>{choice_item.choice}, </span>
                                                            ))
                                                        }</td>
                                                        :
                                                        <td></td>
                                                    }
                                                    <td>{item.length}</td>
                                                    <td><button type="button" onClick={() => deleteHandler(item.id)} title="delete" className="action__button action__delete city__page__delete"><AiFillDelete /></button></td>
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

export default AdminFormFieldView
