import React, { useEffect, useState } from 'react'
import './MainTransaction.css';
import { Container } from 'react-bootstrap'
import { useHistory, useParams, Link } from 'react-router-dom'
import axios from "../../axios"
import { selectUser } from "../../features/userSlice"
import { show, hide } from "../../features/loaderModalSlice"
import { useSelector, useDispatch } from "react-redux"
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { MdKeyboardArrowLeft,  MdKeyboardArrowRight } from "react-icons/md";

const MainTransaction = () => {

    const { sub_service_id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const [formField, setFormField] = useState([])
    const [inputField, setInputField] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState(false)
    const formData = new FormData()
    const config = {
        headers: { Authorization: `Bearer ${user}` }
    };

    useEffect(() => {
        if (sub_service_id === undefined) {
            history.push('/')
        }
    }, [sub_service_id])

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/sub-service-form-fields/view-all-order/${sub_service_id}`, config)
            .then((response) => {
                if (response.data.result.length === 0) {
                    history.push('/')
                } else if (response.data.error) {
                    history.push('/')
                } else {
                    setFormField(response.data.result)
                }
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                history.push('/')
                dispatch(hide())
            })
    }, [dispatch, sub_service_id])

    const saveHandler = () => {
        for (var key in inputField) {
            formData.append(key, inputField[key])
        }
        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post(`/api/sub-service-fields/enter-data/${sub_service_id}`, formData, config)
                    .then((response) => {
                        console.log(response)
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
                            document.querySelector('form').reset();
                        } else if (response.data.error) {
                            setError(true)
                            setErrorMessage(response.data.error)
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
    }

    const handleChange = (e, input_column, input_type) => {
        let values = { ...inputField };
        if (input_type === "attatchment") {
            values[input_column] = e.target.files[0];
            setInputField(values);
        } else {
            values[input_column] = e.target.value;
            setInputField(values);
        }

    }


    return (
        <div className="main__transaction__outer__div">
            <Container>
                <div className="main__transaction__inner__div">
                    <div className="main__transaction__inner__display__div">
                        <div className="main__transaction__inner__display__id">
                            <div className="main__transaction__inner__display__id__description">
                                <div className="main__transaction__inner__display__id__head">
                                    Reference ID
                                </div>
                                <div className="main__transaction__inner__display__id__body">
                                    : <b>1234567890 - XXX</b>
                                </div>
                            </div>

                            <div className="main__transaction__inner__display__pagination">
                                <button className="arrow__btn"><MdKeyboardArrowLeft /></button>
                                <div  className="page__num">1</div>
                                <button className="arrow__btn"><MdKeyboardArrowRight /></button>
                                <div  className="total__page__num">10</div>
                            </div>
                        </div>
                        <div className="main__transaction__inner__display__service">
                            <div className="main__transaction__inner__display__id__description">
                                <div className="main__transaction__inner__display__id__head">
                                    Service Description
                                </div>
                                <div className="main__transaction__inner__display__id__body">
                                    : <b>Transafer of Vehicle - Within Karnataka</b>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main__transaction__inner__display__div__greener">
                        <div className="main__transaction__inner__display__div__greener__text">
                            <p>One step away!! Click here to take it ahead!!</p>
                            <button>Request GServes</button>
                        </div>
                    </div>


                    <div className="main__transaction__inner__display__div">
                        <div className="main__transaction__inner__display__service">
                            <div className="main__transaction__inner__display__id__description">
                                <div className="main__transaction__inner__display__id__head">
                                    Applicatant Name
                                </div>
                                <div className="main__transaction__inner__display__id__body">
                                    : <b>Sunil KM</b>
                                </div>
                            </div>
                        </div>
                        <div className="main__transaction__inner__display__service">
                            <div className="main__transaction__inner__display__id__description">
                                <div className="main__transaction__inner__display__id__head">
                                    User Name
                                </div>
                                <div className="main__transaction__inner__display__id__body">
                                    : <b>Sunil KM</b>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main__transaction__inner__display__div__btn">
                        <button>View / Edit Form</button>
                        <button>Supporting Documents</button>
                        <button>Download Application</button>
                        <button>Email Application</button>
                        <button style={{ background:"#818181", color:"white"}}>Close</button>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default MainTransaction
