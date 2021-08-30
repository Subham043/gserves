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
    const [filterList, setFilterList] = useState([]);
    const [helperNavServices, setHelperNavServices] = useState([]);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    const { sub_service_id } = useParams();
    const [filterValue, setFilterValue] = useState(0);
    const [createDepLink, setCreateDepLink] = useState("/admin/sub-service/create");


    useEffect(() => {
        if (sub_service_id !== undefined) {
            setFilterValueHandler(parseInt(sub_service_id))
        }
    }, [sub_service_id])

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/sub-service/view`)
            .then((response) => {
                setNavServices(response.data.result)
                setHelperNavServices(response.data.result)
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
        if (!window.confirm("Deleting this may lead to deleting its related services. Are you sure you want to delete this?")) {
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

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/service/view/`)
            .then((response) => {
                setFilterList(response.data.result)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })
    }, [dispatch])

    const setFilterValueHandler = (value) => {
        setFilterValue(value)
        if (value === 0) {
            dispatch(show())
            axios.get(`/api/sub-service/view/`, config)
                .then((response) => {
                    setNavServices(response.data.result)
                    setCreateDepLink("/admin/sub-service/create")
                    dispatch(hide())
                })
                .catch((error) => {
                    console.log(error)
                    setCreateDepLink("/admin/sub-service/create")
                    dispatch(hide())
                })

        } else {
            dispatch(show())
            axios.get(`/api/sub-service/view/`, config)
                .then((response) => {
                    let filteredFormFields = response.data.result.filter((item) => {
                        return parseInt(item.service_id) === (value);
                    })
                    setNavServices(filteredFormFields)
                    filteredFormFields.length !== 0 ? setCreateDepLink(`/admin/sub-service/create/${value}`) : setCreateDepLink(`/admin/sub-service/create/${value}`);
                    dispatch(hide())
                })
                .catch((error) => {
                    console.log(error)
                    setCreateDepLink("/admin/sub-service/create")
                    dispatch(hide())
                })

        }
    }

    const searchHandler = (e) =>{
        setSearch(e.target.value)
        if (e.target.value.length === 0) {
            setNavServices(helperNavServices)
        } else {
            let filteredFormFields = helperNavServices.filter((item) => {
                return (item.name).toLowerCase().includes((e.target.value).toLowerCase()) || (item.city_name).toLowerCase().includes((e.target.value).toLowerCase()) || (item.tracking_url).toLowerCase().includes((e.target.value).toLowerCase()) || (item.service_name).toLowerCase().includes((e.target.value).toLowerCase());
            })
            setNavServices(filteredFormFields)
                
        }
        
    }


    return (
        <div className="admin__right__main__service__view  form__field__view">
            <div className="admin__right__main__service__view__form">

                <h2>VIEW MASTER SERVICE</h2>
            </div>
            <div className="create__btn__div">
                <div className="col-lg-2">
                    <input type="text" className="search__input" id="field_name" placeholder="Search Master Service" value={search} onChange={(e) => { searchHandler(e) }} />
                </div>
                <div className="col-lg-7">
                    <div className="row" style={{justifyContent:"flex-end"}}>
                    <select className="form-control filter__select__style master_service_filter" id="field_type" value={filterValue} onChange={(e) => setFilterValueHandler(parseInt(e.target.value))}>
                        <option value="0">ALL</option>
                        {filterList.map((item) => (
                            <option value={item.id} key={item.id}>{item.title}</option>
                        ))}
                    </select>
                    <Link to={createDepLink} className="btn btn-primary card__btn">Create New Master Service</Link>
                    </div>
                </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                <div className="row">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col" >#</th>
                                <th scope="col" >Name</th>
                                <th scope="col" >City</th>
                                <th scope="col" >Tracking URL</th>
                                <th scope="col" >Department</th>
                                <th scope="col" >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                navServices.length > 0 ?
                                    navServices.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <th scope="row">{index}</th>
                                                <td>{item.name}</td>
                                                <td>{item.city_name}</td>
                                                <td>{item.tracking_url}</td>
                                                <td>{item.service_name}</td>
                                                <td><Link to={`/admin/sub-service/display/${item.id}`} className="action__button action__view" title="view"><GrView /></Link> <Link to={`/admin/sub-service/edit/${item.id}`} className="action__button action__edit" title="edit"><AiFillEdit /></Link> <button type="button" onClick={() => deleteHandler(item.id)} title="delete" className="action__button action__delete"><AiFillDelete /></button> <Link to={`/admin/sub-service/fields/${item.id}`} className="action__button action__field" title="add fields"><AiOutlineForm /></Link></td>
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
