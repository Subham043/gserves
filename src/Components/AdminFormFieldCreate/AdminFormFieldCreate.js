import React, { useState, useEffect } from 'react'
import './AdminFormFieldCreate.css'
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { useParams } from 'react-router-dom'
import { toastStart, toastEnd } from "../../features/toasterSlice"

const AdminFormFieldCreate = () => {

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [field_type, setField_type] = useState("email");
    const [mandatory, setMandatory] = useState(0);
    const [length, setLength] = useState(20);
    const [field_name, setField_name] = useState("");
    const [display_name, setDisplay_name] = useState("");
    const [dependent_field_id, setDependent_field_id] = useState("choose");
    const [operator, setOperator] = useState("===");
    const [operated_value, setOperated_value] = useState("");
    const [showDependentFields, setShowDependentFields] = useState(false);
    const [showLengthFields, setShowLengthFields] = useState(true);
    const [showChoiceFields, setShowChoiceFields] = useState(false);
    const [choiceValue, setChoiceValue] = useState([{ choice: "" }, { choice: "" }]);
    const [navServices, setNavServices] = useState([]);

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
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })

    }, [dispatch])






    const fieldNameHandler = (e) => {
        setField_name(e.target.value)
    }

    const fieldTypeHandler = (e) => {
        if (e.target.value === "attatchment") {
            setShowLengthFields(false)
            setShowChoiceFields(false)
        }else if (e.target.value === "multiple choice") {
            setShowLengthFields(false)
            setShowChoiceFields(true)
        } else {
            setShowChoiceFields(false)
            setShowLengthFields(true)
        }
        setField_type(e.target.value)
    }

    const mandatoryHandler = (e) => {
        setMandatory(e.target.value)
    }

    const lengthHandler = (e) => {
        setLength(e.target.value)
    }

    const dependentFieldIdHandler = (e) => {
        if (e.target.value !== "choose") {
            setShowDependentFields(true)
        } else {
            setShowDependentFields(false)
        }
        setDependent_field_id(e.target.value)
    }

    const operatorHandler = (e) => {
        setOperator(e.target.value)
    }

    const operatedValueHandler = (e) => {
        setOperated_value(e.target.value)
    }

    const displayNameHandler = (e) => {
        setDisplay_name(e.target.value)
    }

    const choiceValueHandler = (e, i) => {
        let choice_value = choiceValue;
        choice_value[i].choice = e.target.value;
        setChoiceValue([...choice_value]);
    }

    const serviceFormHandler = (e) => {
        e.preventDefault();
        setError(false)
        setErrorMessage("")

        let choiceArr = [];
        for (let i = 0; i < choiceValue.length; i++) {
            if (choiceValue[i].choice !== "") {
                choiceArr.push(choiceValue[i].choice)
            }
        }

        if (field_name.length === 0 || display_name.length === 0) {
            setError(true)
            setErrorMessage("All fields are required")
        } else if (showLengthFields && length.length === 0) {
            setError(true)
            setErrorMessage("All fields are required")
        } 
        // else if (showDependentFields && dependent_field_id === "choose") {
        //     setError(true)
        //     setErrorMessage("All fields are required")
        // } 
        // else if (showDependentFields && operator.length === 0) {
        //     setError(true)
        //     setErrorMessage("All fields are required")
        // } 
        // else if (showDependentFields && operated_value.length === 0) {
        //     setError(true)
        //     setErrorMessage("All fields are required")
        // } 
        else if (showChoiceFields && choiceValue.length < 2) {
            setError(true)
            setErrorMessage("Minimum 2 Choice Field is required")
        } else if (showChoiceFields && choiceArr.length < 2) {
            setError(true)
            setErrorMessage("Minimum 2 Choice Field is required")
        } else {
            let form = {}
            form['field_name'] = field_name
            form['display_name'] = display_name
            form['field_type'] = field_type
            // form['mandatory'] = mandatory
            // if (showDependentFields) {
            //     form['dependent_field_id'] = dependent_field_id
            //     form['operator'] = operator
            //     form['operated_value'] = operated_value
            // }
            if (showChoiceFields) {
                let choiceArr = [];
                for (let i = 0; i < choiceValue.length; i++) {
                    if (choiceValue[i].choice !== "") {
                        choiceArr.push(choiceValue[i].choice)
                    }
                }
                form['choice'] = choiceArr
            }
            if (showLengthFields) {
                form['length'] = length
            }
            dispatch(show())

            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post(`/api/form-field/create/`, form, config)
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
                                setField_name("");
                                setField_type("email");
                                setMandatory(0);
                                setLength(0);
                                setDisplay_name("");
                                setDependent_field_id("choose");
                                setOperator("===");
                                setOperated_value("");
                                setShowDependentFields(false);
                                setShowLengthFields(true);
                                setShowChoiceFields(false);
                                setChoiceValue([{ choice: "" }, { choice: "" }]);
                                axios.get(`/api/form-field/view-all`, config)
                                    .then((response) => {
                                        setNavServices(response.data.result)
                                        dispatch(hide())
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                        dispatch(hide())
                                    })
                            } else if (response.data.error) {
                                setError(true)
                                setErrorMessage(response.data.error)
                                dispatch(hide())
                            }
                            else if (response.data.field_name) {
                                setError(true)
                                setErrorMessage(response.data.field_name)
                                dispatch(hide())
                            }
                            else if (response.data.field_type) {
                                setError(true)
                                setErrorMessage(response.data.field_type)
                                dispatch(hide())
                            }
                            // else if (response.data.mandatory) {
                            //     setError(true)
                            //     setErrorMessage(response.data.mandatory)
                            //     dispatch(hide())
                            // }
                            else if (response.data.length) {
                                setError(true)
                                setErrorMessage(response.data.length)
                                dispatch(hide())
                            }
                            else if (response.data.display_name) {
                                setError(true)
                                setErrorMessage(response.data.display_name)
                                dispatch(hide())
                            }
                            // else if (response.data.dependent_field_id) {
                            //     setError(true)
                            //     setErrorMessage(response.data.dependent_field_id)
                            //     dispatch(hide())
                            // }
                            // else if (response.data.operator) {
                            //     setError(true)
                            //     setErrorMessage(response.data.operator)
                            //     dispatch(hide())
                            // }
                            // else if (response.data.operated_value) {
                            //     setError(true)
                            //     setErrorMessage(response.data.operated_value)
                            //     dispatch(hide())
                            // }

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


    const addChoiceHandler = () => {
        setChoiceValue([...choiceValue, { choice: "" }])

    }

    const removeChoiceHandler = (val) => {
        let choice_value = choiceValue.filter((item, index) => {
            return index !== val;
        });
        setChoiceValue(choice_value)
    }




    return (
        <div className="admin__right__main__service__view">

            <div className="row" style={{ width: "100%", justifyContent: "center" }}>
                <div className="col-xl-6 col-lg-10 col-md-12 col-sm-12 mb-4">
                    <div className="admin__right__main__service__view__form">
                        <h2>CREATE MASTER FIELDS</h2>
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

                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="field_name">Field Name</label>
                                        <input type="text" className="form-control" id="field_name" placeholder="Enter Field Name" value={field_name} onChange={fieldNameHandler} />
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="field_name">Display Name</label>
                                        <input type="text" className="form-control" id="field_name" placeholder="Enter Display Name" value={display_name} onChange={displayNameHandler} />
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="field_type">Field Type</label>
                                        <select className="form-control" id="field_type" value={field_type} onChange={fieldTypeHandler}>
                                            <option value="email">Email</option>
                                            <option value="text">Text</option>
                                            <option value="description">Description</option>
                                            <option value="number">Number</option>
                                            <option value="mobile">Mobile</option>
                                            <option value="date">Date</option>
                                            <option value="attatchment">Attatchment</option>
                                            <option value="multiple choice">Multiple Choice</option>
                                            <option value="profile name">Profile Name</option>
                                            <option value="profile email">Profile Email</option>
                                            <option value="profile mobile">Profile Mobile</option>
                                            <option value="profile whatsapp">Profile Whatsapp</option>


                                        </select>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    {showLengthFields ?
                                        <div className="form-group">
                                            <label htmlFor="field_name">Character Length</label>
                                            <input type="text" className="form-control" id="field_name" placeholder="Enter Character Length" value={length} onChange={lengthHandler} />
                                        </div>
                                        :
                                        null
                                    }
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    {showChoiceFields ?
                                        <div className="choice__field__outer__div">
                                            <div className="form-group">
                                                <div>
                                                    <label htmlFor="field_name">Choice</label>
                                                </div>
                                            </div>

                                            {choiceValue.map((item, index) => (
                                                <div key={index} className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div className="choice__field__input__div">
                                                        <input type="text" className="form-control" id="choice_namea" name="choice[]" placeholder="Enter Choice" value={item.choice || ""} onChange={(e) => choiceValueHandler(e, index)} />
                                                    </div>
                                                    <div className="choice__field__button__div">
                                                        <button onClick={() => removeChoiceHandler(index)} type="button">Remove</button>
                                                    </div>
                                                </div>
                                            ))
                                            }
                                            <div style={{ textAlign: "center" }} className="choice__field__add__div">
                                                <button onClick={addChoiceHandler} type="button">Add Choice Field</button>
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <button type="submit" className="btn btn-primary card__btn">Create</button>
                                </div>


                            </div>







                            {/* {navServices.length !== 0 ?
                                <div className="form-group">
                                    <label htmlFor="field_type">Dependent Field</label>
                                    <select className="form-control" id="field_type" value={dependent_field_id} onChange={dependentFieldIdHandler}>
                                        <option value="choose">Choose Any</option>
                                        {navServices.map((item) => {
                                            return (
                                                <option key={item.id} value={item.field_name}>{item.field_name}</option>
                                            )
                                        })}


                                    </select>
                                </div>
                                :
                                null
                            } */}

                            {/* {showDependentFields ?
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="field_type">Operator</label>
                                        <select className="form-control" id="field_type" value={operator} onChange={operatorHandler}>
                                            <option value="===">Equal To</option>
                                            <option value="!==">Not Equal To</option>
                                            <option value="<">Less Than</option>
                                            <option value=">">Greater Than</option>
                                            <option value="<=">Less Than Equal To</option>
                                            <option value=">=">Greater Than Equal To</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="field_name">Value</label>
                                        <input type="text" className="form-control" id="field_name" placeholder="Enter Operated Value" value={operated_value} onChange={operatedValueHandler} />
                                    </div>
                                </div>
                                :
                                null
                            } */}

                            {/* <div className="form-group">
                                <label htmlFor="field_type">Mandatory</label>
                                <select className="form-control" id="field_type" value={mandatory} onChange={mandatoryHandler}>
                                    <option value="0">Optional</option>
                                    <option value="1">Mandatory</option>
                                </select>
                            </div> */}






                        </form>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default AdminFormFieldCreate
