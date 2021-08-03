import React, { useState, useEffect } from 'react'
import './AdminSubServiceView.css'
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { Link, useParams } from 'react-router-dom'
import { AiFillEdit, AiFillDelete, AiOutlineForm } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { toastStart, toastEnd } from "../../features/toasterSlice"

const AdminSubServiceView = () => {

    const [navServices, setNavServices] = useState([]);

    const dispatch = useDispatch();

    const { sub_service_id } = useParams();




    useEffect(() => {
        dispatch(show())
        axios.get(`/api/sub-service/view`)
            .then((response) => {
                if (sub_service_id === undefined) {
                    setNavServices(response.data.result)
                }else if (sub_service_id !== undefined) {
                    let filteredFormFields = response.data.result.filter((item) => {
                        return item.service_id === parseInt(sub_service_id);
                    })
                    setNavServices(filteredFormFields)
                }
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })
    }, [dispatch, sub_service_id])

    const adminUser = useSelector(selectAdminUser)
    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };

    const deleteHandler = (id) => {
        if (!window.confirm("Are you sure you want to delete this?")) {
            return false;
        } else {
            dispatch(show())
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.delete(`/api/sub-service/delete/${id}`, config)
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


    return (
        <div className="admin__right__main__service__view">
            <div className="create__btn__div">
                <Link to="/admin/sub-service/create" className="btn btn-primary card__btn">Create New Master Service</Link>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                <div className="row">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col" >#</th>
                                <th scope="col" >Action</th>
                                <th scope="col" >Name</th>
                                <th scope="col" >City</th>
                                <th scope="col" >Tracking URL</th>
                                <th scope="col" >Database Table Name</th>
                                <th scope="col" >Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                navServices.length > 0 ?
                                    navServices.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <th scope="row">{index}</th>
                                                <td><Link to={`/admin/sub-service/display/${item.id}`} className="action__button action__view" title="view"><GrView /></Link> <Link to={`/admin/sub-service/edit/${item.id}`} className="action__button action__edit" title="edit"><AiFillEdit /></Link> <button type="button" onClick={() => deleteHandler(item.id)} title="delete" className="action__button action__delete"><AiFillDelete /></button> <Link to={`/admin/sub-service/fields/${item.id}`} className="action__button action__field" title="add fields"><AiOutlineForm /></Link></td>
                                                <td>{item.name}</td>
                                                <td>{item.city_name}</td>
                                                <td>{item.tracking_url}</td>
                                                <td>{item.storage_table_name}</td>
                                                <td>{item.service_name}</td>
                                            </tr>
                                        );
                                    })
                                    :
                                    <tr>
                                        <td colSpan="14" style={{ textAlign: "center" }}>No Services Available!! Please create one</td>
                                    </tr>
                            }

                        </tbody>
                    </table>

                </div>


            </div>
        </div>
    )
}

export default AdminSubServiceView
