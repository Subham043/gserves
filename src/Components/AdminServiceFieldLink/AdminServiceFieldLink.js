import React, { useState, useEffect } from 'react'
import './AdminServiceFieldLink.css'
import { show, hide } from "../../features/loaderModalSlice"
import axios from "../../axios"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { useParams, useHistory } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { AiFillDelete } from "react-icons/ai";
import { VscVmActive } from "react-icons/vsc";
import { BiBlock } from "react-icons/bi";

const AdminServiceFieldLink = () => {

    const { sub_service_id } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
    const adminUser = useSelector(selectAdminUser)
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    const [fieldList, setFieldList] = useState([]);
    const [addedFieldList, setAddedFieldList] = useState([]);
    const [dependencyFieldList, setDependencyFieldList] = useState([]);
    const [error, setError] = useState(false);

    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };

    useEffect(() => {
        dispatch(show())

        axios.get(`/api/sub-service-form-fields/view-all/${sub_service_id}`, config)
            .then((response) => {
                setAddedFieldList([...addedFieldList, ...response.data.result])
                setDependencyFieldList([...dependencyFieldList, ...response.data.result])
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })

    }, [dispatch, sub_service_id])

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/sub-service/view-by-id/${sub_service_id}`, config)
            .then((response) => {
                setName(response.data.result[0].name)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(toastEnd())
                dispatch(toastStart({
                    toasterStatus: true,
                    toasterMessage: "Invalid Master Service ID",
                    toasterType: "error",
                    timeline: Date().toLocaleString()
                }))
                history.push('/admin/dashboard')
                dispatch(hide())
            })
    }, [dispatch])

    useEffect(() => {
        dispatch(show())

        axios.get(`/api/sub-service-form-fields/view-all-search/${sub_service_id}`, config)
            .then((response) => {

                if (response.data.result.length !== 0) {
                    let new_response = response.data.result.map((item, index) => {
                        item["order_number"] = index
                        item["mandatory"] = 0
                        item["dependent_field_name"] = null
                        item["operator"] = null
                        item["operated_value"] = null
                        item["stored"] = "no"
                        return item
                    })
                    setFieldList(new_response)
                } else {
                    setFieldList(response.data.result)
                }


                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })

    }, [dispatch])

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    const addHandler = () => {

        if (search.length === 0) {
            dispatch(toastEnd())
            dispatch(toastStart({
                toasterStatus: true,
                toasterMessage: "Selecting a field is mandatory before adding!",
                toasterType: "error",
                timeline: Date().toLocaleString()
            }))
            return;
        }

        if (error) {
            dispatch(toastEnd())
            dispatch(toastStart({
                toasterStatus: true,
                toasterMessage: "Fix the errors marked in red before adding",
                toasterType: "error",
                timeline: Date().toLocaleString()
            }))
            return;
        }

        let fieldAdd = fieldList.filter((item) => {
            return item.field_name === search
        })


        if (fieldAdd.length === 0) {
            return false;
        } else {
            setAddedFieldList([...addedFieldList, ...fieldAdd])
            setDependencyFieldList([...dependencyFieldList, ...fieldAdd])
            let fieldRemove = fieldList.filter((item) => {
                return item.field_name !== search
            })

            setFieldList([...fieldRemove])
            setSearch("")
        }
    }

    const deleteHandler = (field_name, stored) => {

        if (stored === "yes") {
            return;
        }


        let fieldAdd = addedFieldList.filter((item) => {
            return item.field_name === field_name
        })

        let dependency = fieldAdd[0].field_name;

        setFieldList([...fieldList, ...fieldAdd])

        let fieldRemove = addedFieldList.filter((item) => {
            return item.field_name !== field_name
        })

        setAddedFieldList([...fieldRemove])
        setDependencyFieldList([...fieldRemove])

        try {
            addedFieldList.map((item, index) => {
                    document.getElementById(`error_dependent_field_name_${index}`).style.border = "1px solid #ced4da";
                    document.getElementById(`error_operator_${index}`).style.border = "1px solid #ced4da";
                    document.getElementById(`error_operated_value_${index}`).style.border = "1px solid #ced4da";
            })
        } catch (error) {
            
        }
    }

    const statusHandler = (i, stored, status) => {
        if (stored === "no") {
            return;
        }

        // addedFieldList.map((item, index) => {
        //     item["order_number"] = index
        // })

        if(status === 1){
            addedFieldList[i]["status"] = 0;
        }else{
            addedFieldList[i]["status"] = 1;
        }
        
        setAddedFieldList([...addedFieldList])

    }

    const handleChange = (e, i, value) => {
        addedFieldList.map((item, index) => {
            item["order_number"] = index
        })
        if (e.target.value === "null" || e.target.value === "") {
            addedFieldList[i][value] = null;
        } else {
            addedFieldList[i][value] = e.target.value;
        }

        if ((addedFieldList[i]["dependent_field_name"] === null && addedFieldList[i]["operator"] === null && addedFieldList[i]["operated_value"] === null) || (addedFieldList[i]["dependent_field_name"] !== null && addedFieldList[i]["operator"] !== null && addedFieldList[i]["operated_value"] !== null)) {
            document.getElementById(`error_dependent_field_name_${i}`).style.border = "1px solid #ced4da";
            document.getElementById(`error_operator_${i}`).style.border = "1px solid #ced4da";
            document.getElementById(`error_operated_value_${i}`).style.border = "1px solid #ced4da";
            setError(false)
        } else {
            document.getElementById(`error_dependent_field_name_${i}`).style.border = "1px solid red";
            document.getElementById(`error_operator_${i}`).style.border = "1px solid red";
            document.getElementById(`error_operated_value_${i}`).style.border = "1px solid red";
            setError(true)
        }
    }

    const saveHandler = () => {

        if (addedFieldList.length === 0) {
            dispatch(toastEnd())
            dispatch(toastStart({
                toasterStatus: true,
                toasterMessage: "Please add atleast 1 Form Field!",
                toasterType: "error",
                timeline: Date().toLocaleString()
            }))
            return;
        }

        addedFieldList.map((item, index) => {
            if ((addedFieldList[index]["dependent_field_name"] === null && addedFieldList[index]["operator"] === null && addedFieldList[index]["operated_value"] === null) || (addedFieldList[index]["dependent_field_name"] !== null && addedFieldList[index]["operator"] !== null && addedFieldList[index]["operated_value"] !== null)) {
                document.getElementById(`error_dependent_field_name_${index}`).style.border = "1px solid #ced4da";
                document.getElementById(`error_operator_${index}`).style.border = "1px solid #ced4da";
                document.getElementById(`error_operated_value_${index}`).style.border = "1px solid #ced4da";
                setError(false)
            } else {
                document.getElementById(`error_dependent_field_name_${index}`).style.border = "1px solid red";
                document.getElementById(`error_operator_${index}`).style.border = "1px solid red";
                document.getElementById(`error_operated_value_${index}`).style.border = "1px solid red";
                setError(true)
                dispatch(toastEnd())
                dispatch(toastStart({
                    toasterStatus: true,
                    toasterMessage: "Fix the errors marked in red before adding",
                    toasterType: "error",
                    timeline: Date().toLocaleString()
                }))
                return;
            }
        })

        if (error) {
            dispatch(toastEnd())
            dispatch(toastStart({
                toasterStatus: true,
                toasterMessage: "Fix the errors marked in red before adding",
                toasterType: "error",
                timeline: Date().toLocaleString()
            }))
            return;
        }

        addedFieldList.map((item, index) => {
            item["order_number"] = index
        })
        dispatch(show())
        let formData = { fields: addedFieldList }
        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post(`/api/sub-service-form-fields/create/${sub_service_id}`, formData, config)
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
                        } else if (response.data.error) {
                            dispatch(toastEnd())
                            dispatch(toastStart({
                                toasterStatus: true,
                                toasterMessage: response.data.error,
                                toasterType: "error",
                                timeline: Date().toLocaleString()
                            }))
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

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(addedFieldList)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        setAddedFieldList(items)
    }




    return (
        <div className="admin__service__field__link__outer__div">
            <div className="row" style={{ width: "100%", justifyContent: "center" }}>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                    <div className="admin__right__main__service__view__form">
                        <h2>ADD FIELDS FOR {name}</h2>
                    </div>
                    <div className="create__btn__div">
                        <div className="col-lg-5" style={{ display: 'flex', padding: 0 }}>
                            <input type="text" className="search__input" autoComplete="off" list="field__list" id="field_name" placeholder="Search Master Field" value={search} onChange={(e) => { searchHandler(e) }} />
                            <datalist id="field__list">
                                {fieldList.map((item, index) => {
                                    return (<option key={index}>{item.field_name}</option>);
                                })}
                            </datalist>
                            <button onClick={addHandler} className="btn btn-primary admin__service__field__link__add__btn">Add</button>
                        </div>
                        <button className="btn btn-primary card__btn" onClick={saveHandler}>Save Changes</button>
                    </div>
                    <div className="row">
                        <table className="table table-striped" style={{ borderBottom: "1px solid rgba(0,0,0,.05)" }}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" >#</th>
                                    <th scope="col" >Field Name</th>
                                    <th scope="col" >Display Name</th>
                                    <th scope="col" >Mandatory</th>
                                    <th scope="col" >Dependent Field</th>
                                    <th scope="col" >Operator</th>
                                    <th scope="col" >Value</th>
                                    <th scope="col" >Action</th>
                                </tr>
                            </thead>
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Droppable droppableId="fields">
                                    {(provided) => (
                                        <tbody  {...provided.droppableProps} ref={provided.innerRef}>
                                            {
                                                addedFieldList.length > 0 ?
                                                    addedFieldList.map((item, index) => {
                                                        return (
                                                            <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
                                                                {(provided) => (
                                                                    <tr {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{item.field_name}</td>
                                                                        <td>{item.display_name}</td>
                                                                        <td>
                                                                            <select className="custom-select" defaultValue={item.mandatory} onChange={(e) => handleChange(e, index, "mandatory")} >
                                                                                <option value="0">Optional</option>
                                                                                <option value="1">Mandatory</option>
                                                                            </select>
                                                                        </td>
                                                                        <td>
                                                                            <select id={`error_dependent_field_name_${index}`} defaultValue={item.dependent_field_name !== null ? item.dependent_field_name : ` `} className="custom-select" onChange={(e) => handleChange(e, index, "dependent_field_name")} >
                                                                                <option value="null">Choose...</option>
                                                                                {addedFieldList.map((depItem, depIndex) => {
                                                                                    if (depItem.field_name !== item.field_name) {
                                                                                        return (<option value={depItem.field_name} key={depIndex}>{depItem.field_name}</option>)
                                                                                    }
                                                                                })}
                                                                            </select>
                                                                        </td>
                                                                        <td>
                                                                            <select id={`error_operator_${index}`} defaultValue={item.operator} className="custom-select" onChange={(e) => handleChange(e, index, "operator")} >
                                                                                <option value="null">Choose...</option>
                                                                                <option value="equal_to">Equal To</option>
                                                                                <option value="not_equal_to">Not Equal To</option>
                                                                                <option value="less_than">Less Than</option>
                                                                                <option value="greater_than">Greater Than</option>
                                                                                <option value="less_than_equal_to">Less Than Equal To</option>
                                                                                <option value="greater_than_equal_to">Greater Than Equal To</option>
                                                                            </select>
                                                                        </td>
                                                                        <td>
                                                                            <input type="text" id={`error_operated_value_${index}`} defaultValue={item.operated_value} className={`form-control`} placeholder="Enter value" onChange={(e) => handleChange(e, index, "operated_value")} />
                                                                        </td>
                                                                        {
                                                                            item.stored === "no" ?
                                                                                <td><button type="button" onClick={() => deleteHandler(item.field_name, item.stored)} title="delete" className="action__button action__delete field__link__page__delete"><AiFillDelete /></button></td>
                                                                                :
                                                                                <td><button type="button" onClick={() => statusHandler(index, item.stored, item.status)} title={item.status === 1 ? 'Inactive' : 'Active' } className={item.status === 1 ? `action__button action__delete field__link__page__inactive` : `action__button action__delete field__link__page__active`}>{item.status == 1 ?  <BiBlock />: <VscVmActive />}</button></td>
                                                                        }

                                                                    </tr>
                                                                )}

                                                            </Draggable>
                                                        );
                                                    })
                                                    :
                                                    <tr>
                                                        <td colSpan="14" style={{ textAlign: "center" }}>No Fields Available!! Please add one</td>
                                                    </tr>
                                            }
                                            {provided.placeholder}
                                        </tbody>
                                    )}

                                </Droppable>
                            </DragDropContext>
                        </table>

                    </div>


                </div>

            </div>
        </div>
    )
}

export default AdminServiceFieldLink
