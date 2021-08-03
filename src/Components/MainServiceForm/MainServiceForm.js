import React, { useEffect, useState } from 'react'
import './MainServiceForm.css';
import { Container } from 'react-bootstrap'
import { useHistory, useParams, Link } from 'react-router-dom'
import axios from "../../axios"
import { selectUser } from "../../features/userSlice"
import { show, hide } from "../../features/loaderModalSlice"
import { useSelector, useDispatch } from "react-redux"
import { toastStart, toastEnd } from "../../features/toasterSlice"

const MainServiceForm = () => {

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
        axios.get(`/api/sub-service-fields/view/${sub_service_id}`, config)
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
        <div className="main__service__form__outer__div">
            <Container>
                <div className="main__service__form__inner__div">
                    <form encType="multipart/form-data">
                        <div className="form__outer_div">
                            <div className="heading__ref__id">
                                <p>Ref ID: 1234567890 - <span>000</span></p>
                            </div>
                            <div className="form__main">
                                <div className="row">
                                    {error === true ?
                                        <div className="col-xl-12 col-lg-12 col-sm-12 mb-2 form__row">
                                            <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div>
                                        </div>
                                        :
                                        null
                                    }
                                    {
                                        formField.map((item, index) => {
                                            if (item.field_type === "email") {
                                                return (
                                                    <div key={index} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2 form__email">
                                                        <div className="row" style={{ alignItems: 'center' }}>
                                                            <div className="col-2">
                                                                <label>{item.field_name} :</label>
                                                            </div>
                                                            <div className="col-10">
                                                                <input type="text" onChange={(e) => handleChange(e, item.field_column_name, item.field_type)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            } else if (item.field_type === "text") {
                                                return (
                                                    <div key={index} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2 form__text">
                                                        <div className="row" style={{ alignItems: 'center' }}>
                                                            <div className="col-2">
                                                                <label>{item.field_name} :</label>
                                                            </div>
                                                            <div className="col-10">
                                                                <input type="text" onChange={(e) => handleChange(e, item.field_column_name, item.field_type)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else if (item.field_type === "number") {
                                                return (
                                                    <div key={index} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2 form__number">
                                                        <div className="row" style={{ alignItems: 'center' }}>
                                                            <div className="col-2">
                                                                <label>{item.field_name} :</label>
                                                            </div>
                                                            <div className="col-10">
                                                                <input type="text" onChange={(e) => handleChange(e, item.field_column_name, item.field_type)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else if (item.field_type === "mobile") {
                                                return (
                                                    <div key={index} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2 form__mobile">
                                                        <div className="row" style={{ alignItems: 'center' }}>
                                                            <div className="col-2">
                                                                <label>{item.field_name} :</label>
                                                            </div>
                                                            <div className="col-10">
                                                                <input type="text" onChange={(e) => handleChange(e, item.field_column_name, item.field_type)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else if (item.field_type === "date") {
                                                return (
                                                    <div key={index} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2 form__date">
                                                        <div className="row" style={{ alignItems: 'center' }}>
                                                            <div className="col-2">
                                                                <label>{item.field_name} :</label>
                                                            </div>
                                                            <div className="col-10">
                                                                <input type="date" onChange={(e) => handleChange(e, item.field_column_name, item.field_type)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else if (item.field_type === "attatchment") {
                                                return (
                                                    <div key={index} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2 form__attatchment">
                                                        <div className="row" style={{ alignItems: 'center' }}>
                                                            <div className="col-2">
                                                                <label>{item.field_name} :</label>
                                                            </div>
                                                            <div className="col-10">
                                                                <input type="file" onChange={(e) => handleChange(e, item.field_column_name, item.field_type)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else if (item.field_type === "description") {
                                                return (
                                                    <div key={index} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2 form__description">
                                                        <div className="row" style={{ alignItems: 'center' }}>
                                                            <div className="col-2">
                                                                <label>{item.field_name} :</label>
                                                            </div>
                                                            <div className="col-10">
                                                                <textarea onChange={(e) => handleChange(e, item.field_column_name, item.field_type)}></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                        )
                                    }







                                </div>
                            </div>
                        </div>
                        <div className="form__outer__btn_div">
                            <button className="save__btn__service__form" onClick={saveHandler} type="button">Save</button>
                            <button className="submit__btn__service__form" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default MainServiceForm
