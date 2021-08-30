import React, { useState, useEffect } from 'react'
import './AdminServiceView.css'
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { AiFillEdit, AiFillDelete, AiFillFileAdd } from "react-icons/ai";
import { GrView } from "react-icons/gr";

const AdminServiceView = () => {

    const [navServices, setNavServices] = useState([]);

    const { city_id } = useParams();
    const dispatch = useDispatch();
    const [cityList, setCityList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [filterValue, setFilterValue] = useState(0);
    const [createDepLink, setCreateDepLink] = useState("/admin/service/create");
    const [helperNavServices, setHelperNavServices] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (city_id !== undefined) {
            setFilterValueHandler(parseInt(city_id))
        }
    }, [city_id])


    useEffect(() => {
        dispatch(show())
        axios.get(`/api/service/view`)
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

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/city/view/`)
            .then((response) => {
                setCityList(response.data.result)
                setFilterList(response.data.result)
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
        if (!window.confirm("Deleting this may lead to deleting its related master services and services. Are you sure you want to delete this?")) {
            return false;
        } else {
            dispatch(show())
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.delete(`/api/service/delete/${id}`, config)
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

    const setFilterValueHandler = (value) => {
        setFilterValue(value)
        if (value === 0) {
            dispatch(show())
            axios.get(`/api/service/view/`, config)
                .then((response) => {
                    setNavServices(response.data.result)
                    setCreateDepLink("/admin/service/create")
                    dispatch(hide())
                })
                .catch((error) => {
                    console.log(error)
                    setCreateDepLink("/admin/service/create")
                    dispatch(hide())
                })

        } else {
            dispatch(show())
            axios.get(`/api/service/view/`, config)
                .then((response) => {
                    let filteredFormFields = response.data.result.filter((item) => {
                        return parseInt(item.city) === (value);
                    })
                    setNavServices(filteredFormFields)
                    filteredFormFields.length !== 0 ? setCreateDepLink(`/admin/service/create/${value}`) : setCreateDepLink(`/admin/service/create/${value}`);
                    dispatch(hide())
                })
                .catch((error) => {
                    console.log(error)
                    setCreateDepLink("/admin/service/create")
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
                return (item.title).toLowerCase().includes((e.target.value).toLowerCase()) || (item.city_name).toLowerCase().includes((e.target.value).toLowerCase()) || (item.url).toLowerCase().includes((e.target.value).toLowerCase());
            })
            setNavServices(filteredFormFields)
                
        }
        
    }




    return (
        <div className="admin__right__main__service__view department__view form__field__view">
            <div className="admin__right__main__service__view__form">
                <h2>VIEW DEPARTMENT</h2>
            </div>
            <div className="create__btn__div">
                <div className="col-lg-2">
                    <input type="text" className="search__input" id="field_name" placeholder="Search Department" value={search} onChange={(e) => { searchHandler(e) }} />
                </div>
                <div className="col-lg-4">
                    <div className="row" style={{ justifyContent: "flex-end" }}>
                        <select className="form-control filter__select__style  master_service_filter" id="field_type" value={filterValue} onChange={(e) => setFilterValueHandler(parseInt(e.target.value))}>
                            <option value="0">ALL</option>
                            {filterList.map((item) => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <Link to={createDepLink} className="btn btn-primary card__btn">Create New Department</Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                    <div className="row">
                        <table className="table table-striped" style={{ borderBottom: "1px solid rgba(0,0,0,.05)" }}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" >#</th>

                                    <th scope="col" >Department Name</th>
                                    <th scope="col" >Department City</th>
                                    <th scope="col" >Department Link</th>
                                    <th scope="col" >Department Logo</th>
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

                                                    <td>{item.title}</td>
                                                    <td>{item.city_name}</td>
                                                    <td>{item.url}</td>
                                                    <td><img className="card-img-top" src={`http://127.0.0.1:8000/service/logo/${item.logo}`} alt="Card image cap" /></td>
                                                    <td><Link to={`/admin/sub-service/create/${item.id}`} className="action__button action__view department__page__create" title="create master service"><AiFillFileAdd /></Link> <Link to={`/admin/sub-service/view/${item.id}`} className="action__button action__view department__page__view" title="view master service"><GrView /></Link> <Link to={`/admin/service/edit/${item.id}`} className="action__button action__edit department__page__edit" title="edit"><AiFillEdit /></Link> <button type="button" onClick={() => deleteHandler(item.id)} title="delete" className="action__button action__delete department__page__delete"><AiFillDelete /></button></td>
                                                </tr>
                                            );
                                        })
                                        :
                                        <tr>
                                            <td colSpan="14" style={{ textAlign: "center" }}>No Department Available!! Please create one</td>
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

export default AdminServiceView
