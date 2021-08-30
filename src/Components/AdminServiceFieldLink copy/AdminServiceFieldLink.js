import React, { useState, useEffect } from 'react'
import './AdminServiceFieldLink.css'
import { show, hide } from "../../features/loaderModalSlice"
import axios from "../../axios"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const AdminServiceFieldLink = () => {

    const { sub_service_id } = useParams();

    const dispatch = useDispatch();
    const adminUser = useSelector(selectAdminUser)
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    const [fieldList, setFieldList] = useState([]);
    const [addedFieldList, setAddedFieldList] = useState([]);

    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/sub-service/view-by-id/${sub_service_id}`, config)
            .then((response) => {
                setName(response.data.result[0].name)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })
    }, [dispatch])

    useEffect(() => {
        dispatch(show())

        axios.get(`/api/form-field/view-all`, config)
            .then((response) => {
                setFieldList(response.data.result)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })

    }, [dispatch])

    const fieldAddHandler = (id) => {
        let addedField = fieldList.filter(field => {
            if (field.id === id) {
                return field;
            }
        })

        let removedField = fieldList.filter(field => {
            if (field.id !== id) {
                return field;
            }
        })
        setFieldList(removedField)

        setAddedFieldList([...addedFieldList, ...addedField])
    }

    const fieldRemoveHandler = (id) => {
        let addedField = addedFieldList.filter(field => {
            if (field.id === id) {
                return field;
            }
        })

        let removedField = addedFieldList.filter(field => {
            if (field.id !== id) {
                return field;
            }
        })
        setFieldList([...fieldList, ...addedField])

        setAddedFieldList(removedField)
    }

    const handleOnDragEnd = (result) => {
        if(!result.destination) return;
        const items = Array.from(addedFieldList)
        const [reorderedItem] = items.splice(result.source.index,1)
        items.splice(result.destination.index, 0, reorderedItem)
        setAddedFieldList(items)
    }

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }


    return (
        <div className="admin__service__field__link__outer__div">
            <div className="row mb-3" style={{ justifyContent:"flex-end"}}>
                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12">
                    <input className="search__form__field" type="search" placeholder="Search..." onChange={(e)=> searchHandler(e)} value={search} />
                </div>
            </div>
            <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="admin__service__field__link__inner__div">
                        <div className="admin__service__field__link__heading">
                            {name} Field List
                        </div>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="fields">
                                {(provided) => (
                                    <div className="admin__service__field__link__list__div" {...provided.droppableProps} ref={provided.innerRef}>
                                        {addedFieldList.map((field, index) => {
                                            return (
                                                <Draggable key={field.id.toString()} draggableId={field.id.toString()} index={index}>
                                                    {(provided) => (
                                                        <div {...provided.draggableProps} {...provided.dragHandleProps} className="admin__service__field__link__list__inner__div mb-3 mouse__drag__cursor" ref={provided.innerRef}>

                                                            <div><b>Field Name :</b> {field.field_name}</div>
                                                            <div><b>Field Type :</b> {field.field_type}</div>
                                                            <div><button onClick={() => fieldRemoveHandler(field.id)} style={{ color: "red", borderColor: "red" }}>Remove</button></div>
                                                        </div>
                                                    )}

                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}

                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="admin__service__field__link__inner__div">
                        <div className="admin__service__field__link__heading">
                            Available Fields
                        </div>
                        <div className="admin__service__field__link__list__div">
                            {search.length===0 ?
                            fieldList.map(field => {
                                return (
                                    <div key={field.id} className="admin__service__field__link__list__inner__div mb-3">
                                        <div><button onClick={() => fieldAddHandler(field.id)}>Add</button></div>
                                        <div><b>Field Name :</b> {field.field_name}</div>
                                        <div><b>Field Type :</b> {field.field_type}</div>
                                    </div>
                                )
                            })
                            :
                            fieldList.map(field => {
                                if (field.field_name.toLowerCase().includes(search.toLowerCase()) || field.field_type.toLowerCase().includes(search.toLowerCase()) ) {
                                return (
                                    <div key={field.id} className="admin__service__field__link__list__inner__div mb-3">
                                        <div><button onClick={() => fieldAddHandler(field.id)}>Add</button></div>
                                        <div><b>Field Name :</b> {field.field_name}</div>
                                        <div><b>Field Type :</b> {field.field_type}</div>
                                    </div>
                                )
                                }else{
                                    return null;
                                }
                            })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminServiceFieldLink
