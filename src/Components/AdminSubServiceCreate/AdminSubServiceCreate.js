import React, { useState, useEffect } from 'react'
import './AdminSubServiceCreate.css'
import { show, hide } from "../../features/loaderModalSlice"
import axios from "../../axios"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { useParams } from 'react-router-dom'

const AdminSubServiceCreate = () => {

    const dispatch = useDispatch();
    const adminUser = useSelector(selectAdminUser)
    const [navServices, setNavServices] = useState([]);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tag_line, setTag_line] = useState("");
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
    const [showDepartment, setShowDepartment] = useState(true);
    const { sub_service_id } = useParams();

    useEffect(()=>{
        if(sub_service_id !== undefined){
            setShowDepartment(false)
            setService_id(parseInt(sub_service_id))
        }
    }, [sub_service_id])

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value)
    }

    const tagLineHandler = (e) => {
        setTag_line(e.target.value)
    }

    const inPersonHandler = () => {
        setOption_person(!option_person)
    }

    const inOnlineHandler = () => {
        setOption_online(!option_online)
    }

    const inRepresentativeHandler = () => {
        setOption_representative(!option_representative)
    }

    const timeTakenHandler = (e) => {
        setTime_taken(e.target.value)
    }

    const outputHandler = (e) => {
        setOutput(e.target.value)
    }

    const govtFeesHandler = (e) => {
        setGovt_fees(e.target.value)
    }

    const otherExpensesHandler = (e) => {
        setOther_expenses(e.target.value)
    }

    const serviceChargesHandler = (e) => {
        setService_charges(e.target.value)
    }

    const trackingUrlHandler = (e) => {
        setTracking_url(e.target.value)
    }

    const serviceIdHandler = (e) => {
        setService_id(parseInt(e.target.value))
    }



    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };


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




    const serviceFormHandler = (e) => {
        e.preventDefault();
        setError(false)
        setErrorMessage("")

        if (name.length === 0 || tracking_url.length === 0 || description.length === 0 || tag_line.length === 0 || output.length === 0 || time_taken.length === 0 || govt_fees.length === 0 || other_expenses.length === 0 || service_charges.length === 0) {
            setError(true)
            setErrorMessage("All fields are required")
        } else {

            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('tag_line', tag_line)
            formData.append('output', output)
            formData.append('option_person', option_person ? 1 : 0)
            formData.append('option_online', option_online ? 1 : 0)
            formData.append('option_representative', option_representative ? 1 : 0)
            formData.append('time_taken', time_taken)
            formData.append('govt_fees', govt_fees)
            formData.append('other_expenses', other_expenses)
            formData.append('service_charges', service_charges)
            formData.append('tracking_url', tracking_url)
            dispatch(show())

            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post(`/api/sub-service/create/${service_id}`, formData, config)
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
                                setName("");
                                setDescription("");
                                setTag_line("");
                                setOption_person(false);
                                setOption_online(false);
                                setOption_representative(false);
                                setOutput("");
                                setTime_taken("");
                                setGovt_fees("");
                                setOther_expenses("");
                                setService_charges("");
                                setTracking_url("");
                            } else if (response.data.error) {
                                setError(true)
                                setErrorMessage(response.data.error)
                                dispatch(hide())
                            }
                            else if (response.data.name) {
                                setError(true)
                                setErrorMessage(response.data.name)
                                dispatch(hide())
                            }
                            else if (response.data.tracking_url) {
                                setError(true)
                                setErrorMessage(response.data.tracking_url)
                                dispatch(hide())
                            }
                            else if (response.data.description) {
                                setError(true)
                                setErrorMessage(response.data.description)
                                dispatch(hide())
                            }
                            else if (response.data.tag_line) {
                                setError(true)
                                setErrorMessage(response.data.tag_line)
                                dispatch(hide())
                            }
                            else if (response.data.output) {
                                setError(true)
                                setErrorMessage(response.data.output)
                                dispatch(hide())
                            }
                            else if (response.data.option) {
                                setError(true)
                                setErrorMessage(response.data.option)
                                dispatch(hide())
                            }
                            else if (response.data.time_taken) {
                                setError(true)
                                setErrorMessage(response.data.time_taken)
                                dispatch(hide())
                            }
                            else if (response.data.govt_fees) {
                                setError(true)
                                setErrorMessage(response.data.govt_fees)
                                dispatch(hide())
                            }
                            else if (response.data.other_expenses) {
                                setError(true)
                                setErrorMessage(response.data.other_expenses)
                                dispatch(hide())
                            }
                            else if (response.data.service_charges) {
                                setError(true)
                                setErrorMessage(response.data.service_charges)
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
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="admin__right__main__service__create__form">
                        <h2>CREATE NEW MASTER SERVICE</h2>
                    </div>
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
                                <label htmlFor="Name">Name</label>
                                <input type="text" className="form-control" id="Name" placeholder="Enter Name" value={name} onChange={nameHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control" id="description" rows="3" placeholder="Enter Description" value={description} onChange={descriptionHandler} ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tag_line">Tag Line</label>
                                <input type="text" className="form-control" id="tag_line" placeholder="Enter Tag Line" value={tag_line} onChange={tagLineHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="output">Output</label>
                                <textarea className="form-control" id="output" rows="3" placeholder="Enter Output" value={output} onChange={outputHandler} ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="option">Option</label>
                            </div>
                            <div className="form-group" style={{display:"flex", justifyContent: "flex-start", alignItems: "center"}}>
                                <div className="form-check" style={{marginRight:"10px"}}>
                                    <input className="form-check-input" type="checkbox" onChange={inPersonHandler} id="in_person" checked={option_person} />
                                    <label className="form-check-label" htmlFor="in_person">
                                        In Person
                                    </label>
                                </div>
                                <div className="form-check" style={{marginRight:"10px"}}>
                                    <input className="form-check-input" type="checkbox" value="" id="online" onChange={inOnlineHandler} checked={option_online} />
                                    <label className="form-check-label" htmlFor="online">
                                        Online
                                    </label>
                                </div>
                                <div className="form-check" style={{marginRight:"10px"}}>
                                    <input className="form-check-input" type="checkbox" value="" id="representative" onChange={inRepresentativeHandler} checked={option_representative} />
                                    <label className="form-check-label" htmlFor="representative">
                                        Representative
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="time_taken">Time Taken</label>
                                <input type="text" className="form-control" id="time_taken" placeholder="Enter Time Taken" value={time_taken} onChange={timeTakenHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="govt_fees">Government Fees</label>
                                <input type="text" className="form-control" id="govt_fees" placeholder="Enter Government Fees" value={govt_fees} onChange={govtFeesHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="other_expenses">Other Expenses</label>
                                <input type="text" className="form-control" id="other_expenses" placeholder="Enter Other Expenses" value={other_expenses} onChange={otherExpensesHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="service_charges">Service Charges</label>
                                <input type="text" className="form-control" id="service_charges" placeholder="Enter Service Charges" value={service_charges} onChange={serviceChargesHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tracking_url">Tracking URL</label>
                                <input type="text" className="form-control" id="tracking_url" placeholder="Enter Tracking URL" value={tracking_url} onChange={trackingUrlHandler} />
                            </div>
                            {showDepartment ? 
                            <div className="form-group">
                                <label htmlFor="service">Department</label>
                                <select className="form-control" id="service" value={service_id} onChange={serviceIdHandler}>
                                    {navServices.map((item) => {
                                        return (<option key={item.id} value={item.id}>{item.title}</option>);
                                    })}


                                </select>
                            </div>
                            : null }


                            <button type="submit" className="btn btn-primary card__btn">Create</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminSubServiceCreate
