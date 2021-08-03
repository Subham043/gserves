import React, { useState, useEffect } from 'react'
import './AdminSubServiceDisplay.css'
import { show, hide } from "../../features/loaderModalSlice"
import axios from "../../axios"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { Link, useParams } from 'react-router-dom';

const AdminSubServiceDisplay = () => {

    const { sub_service_id } = useParams();

    const dispatch = useDispatch();
    const adminUser = useSelector(selectAdminUser)
    const [cityList, setCityList] = useState([]);
    const [navServices, setNavServices] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tag_line, setTag_line] = useState("");
    const [city, setCity] = useState(1);
    const [option_online, setOption_online] = useState(false);
    const [option_person, setOption_person] = useState(false);
    const [option_representative, setOption_representative] = useState(false);
    const [output, setOutput] = useState("");
    const [time_taken, setTime_taken] = useState("");
    const [govt_fees, setGovt_fees] = useState("");
    const [other_expenses, setOther_expenses] = useState("");
    const [service_charges, setService_charges] = useState("");
    const [tracking_url, setTracking_url] = useState("");
    const [service_id, setService_id] = useState(1);




    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/city/view/`, config)
            .then((response) => {
                setCityList(response.data.result)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })
    }, [dispatch])

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/sub-service/view-by-id/${sub_service_id}`, config)
            .then((response) => {
                setName(response.data.result[0].name)
                setDescription(response.data.result[0].description)
                setTag_line(response.data.result[0].tag_line)
                setOutput(response.data.result[0].output)
                setTime_taken(response.data.result[0].time_taken)
                setGovt_fees(response.data.result[0].govt_fees)
                setOther_expenses(response.data.result[0].other_expenses)
                setService_charges(response.data.result[0].service_charges)
                setTracking_url(response.data.result[0].tracking_url)
                setCity(parseInt(response.data.result[0].city))
                setOption_online(parseInt(response.data.result[0].option_online) === 0 ? false : true)
                setOption_person(parseInt(response.data.result[0].option_person) === 0 ? false : true)
                setOption_representative(parseInt(response.data.result[0].option_representative) === 0 ? false : true)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })
    }, [dispatch])

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
        <div className="admin__right__main__service__create">

            <div style={{ position: "relative" }}>
                <div className="right__btn__fixed__view">
                    <div className="create__btn__div">
                        <Link to={`/admin/sub-service-field/create/${sub_service_id}`} className="btn btn-primary card__btn">View Sub-Service</Link>
                    </div>
                    <div className="create__btn__div">
                        <Link to="/admin/service/create" className="btn btn-primary card__btn">Create Sub-Service</Link>
                    </div>
                    <div className="create__btn__div">
                        <Link to={`/admin/sub-service-field/view/${sub_service_id}`} className="btn btn-primary card__btn">View Form Fields</Link>
                    </div>
                    <div className="create__btn__div">
                        <Link to={`/admin/sub-service-field/create/${sub_service_id}`} className="btn btn-primary card__btn">Create Form Fields</Link>
                    </div>


                </div>
            </div>

            <div className="row" style={{ width: "100%", justifyContent: "center" }}>

                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                    <div className="admin__right__main__service__create__form">
                        <h2>VIEW MASTER SERVICE</h2>
                    </div>

                    <div className="card form__card" style={{ width: "100%" }}>


                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input type="text" className="form-control" id="Name" placeholder="Enter Name" value={name} readOnly={true} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" id="description" rows="3" placeholder="Enter Description" value={description} readOnly={true}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tag_line">Tag Line</label>
                            <input type="text" className="form-control" id="tag_line" placeholder="Enter Tag Line" value={tag_line} readOnly={true} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <select className="form-control" id="exampleFormControlSelect1" value={city} readOnly={true}>
                                {cityList.map((item) => {
                                    return (<option key={item.id} value={item.id}>{item.name}</option>);
                                })}


                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="output">Output</label>
                            <textarea className="form-control" id="output" rows="3" placeholder="Enter Output" value={output} readOnly={true}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="option">Option</label>
                        </div>
                        <div className="form-group" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                            <div className="form-check" style={{ marginRight: "10px" }}>
                                <input className="form-check-input" type="checkbox" value="" id="in_person" checked={option_person} />
                                <label className="form-check-label" htmFor="in_person">
                                    In Person
                                </label>
                            </div>
                            <div className="form-check" style={{ marginRight: "10px" }}>
                                <input className="form-check-input" type="checkbox" value="" id="online" checked={option_online} />
                                <label className="form-check-label" htmFor="online">
                                    Online
                                </label>
                            </div>
                            <div className="form-check" style={{ marginRight: "10px" }}>
                                <input className="form-check-input" type="checkbox" value="" id="representative" checked={option_representative} />
                                <label className="form-check-label" htmFor="representative">
                                    Representative
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="time_taken">Time Taken</label>
                            <input type="text" className="form-control" id="time_taken" placeholder="Enter Time Taken" value={time_taken} readOnly={true} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="govt_fees">Government Fees</label>
                            <input type="text" className="form-control" id="govt_fees" placeholder="Enter Government Fees" value={govt_fees} readOnly={true} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="other_expenses">Other Expenses</label>
                            <input type="text" className="form-control" id="other_expenses" placeholder="Enter Other Expenses" value={other_expenses} readOnly={true} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="service_charges">Service Charges</label>
                            <input type="text" className="form-control" id="service_charges" placeholder="Enter Service Charges" value={service_charges} readOnly={true} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tracking_url">Tracking URL</label>
                            <input type="text" className="form-control" id="tracking_url" placeholder="Enter Tracking URL" value={tracking_url} readOnly={true} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="service">Department</label>
                            <select className="form-control" id="service" value={service_id} readOnly={true}>
                                {navServices.map((item) => {
                                    return (<option key={item.id} value={item.id}>{item.title}</option>);
                                })}


                            </select>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminSubServiceDisplay
