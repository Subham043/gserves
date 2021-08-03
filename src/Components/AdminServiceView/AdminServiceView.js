import React, { useState, useEffect } from 'react'
import './AdminServiceView.css'
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";

const AdminServiceView = () => {

    const [navServices, setNavServices] = useState([]);
    
    const dispatch = useDispatch();
    const [cityList, setCityList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [filterValue, setFilterValue] = useState(0);



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

    const setFilterValueHandler = (value) => {
        setFilterValue(value)
        if (value === 0) {
            dispatch(show())
            axios.get(`/api/service/view/`, config)
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
            axios.get(`/api/service/view/`, config)
                .then((response) => {
                    let filteredFormFields = response.data.result.filter((item) => {
                        return parseInt(item.city) === (value);
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
                <Link to="/admin/service/create" className="btn btn-primary card__btn">Create New Department</Link>
            </div>
            <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                    <div className="row">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" >#</th>
                                    <th scope="col" >Action</th>
                                    <th scope="col" >Department Name</th>
                                    <th scope="col" >Department City</th>
                                    <th scope="col" >Department Link</th>
                                    <th scope="col" >Department Logo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    navServices.length > 0 ?
                                        navServices.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{index}</td>
                                                    <td><Link to={`/admin/sub-service/view/${item.id}`} className="action__button action__view" title="view master service"><GrView /></Link> <Link to={`/admin/service/edit/${item.id}`} className="action__button action__edit" title="edit"><AiFillEdit /></Link> <button type="button" onClick={() => deleteHandler(item.id)} title="delete" className="action__button action__delete"><AiFillDelete /></button></td>
                                                    <td>{item.title}</td>
                                                    <td>{item.city_name}</td>
                                                    <td>{item.url}</td>
                                                    <td><img className="card-img-top" src={`http://127.0.0.1:8000/service/logo/${item.logo}`} alt="Card image cap" /></td>
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
