import React, { useEffect, useState } from 'react'
import './MainSuccess.css';
import { Container } from 'react-bootstrap'
import { useHistory, useParams, Link } from 'react-router-dom'
import axios from "../../axios"
import { selectUser } from "../../features/userSlice"
import { show, hide } from "../../features/loaderModalSlice"
import { useSelector, useDispatch } from "react-redux"
import { toastStart, toastEnd } from "../../features/toasterSlice"

const MainSuccess = () => {

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
        <div className="main__success__outer__div">
            <Container>
                <div className="main__success__inner__div">
                    <div className="form__outer_div">
                        <div className="form__main">
                            <div className="form__main__inner__container">
                                <div className="form__main__inner_thank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"/></svg>
                                    <p>Thank You</p>
                                </div>
                                <div className="form__main__inner_request">
                                    <p>One step away!! Click here to take it ahead</p>
                                    <button>Request Gserve</button>
                                </div>
                                <div className="form__main__inner__btn__group">
                                    <button>View / Edit Form</button>
                                    <button>Supporting Documents</button>
                                    <button>Download Application</button>
                                    <button>Email Application</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MainSuccess
