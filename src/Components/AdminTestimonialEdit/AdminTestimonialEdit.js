import React, { useState, useEffect } from 'react'
import './AdminTestimonialEdit.css'
import { show, hide } from "../../features/loaderModalSlice"
import axios from "../../axios"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"
import { toastStart, toastEnd } from "../../features/toasterSlice"
import { useParams } from 'react-router-dom'

const AdminTestimonialEdit = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const adminUser = useSelector(selectAdminUser)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null)
    const [nameDemo, setNameDemo] = useState("Title goes here");
    const [descriptionDemo, setDescriptionDemo] = useState("URL goes here");
    const [imageDemo, setImageDemo] = useState("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17ac8ee0067%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17ac8ee0067%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1875%22%20y%3D%2296.2765625%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");

    const nameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value.length === 0) {
            setNameDemo("Name goes here")
        } else {
            setNameDemo(e.target.value)
        }
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value)
        if (e.target.value.length === 0) {
            setDescriptionDemo("Description goes here")
        } else {
            setDescriptionDemo(e.target.value)
        }
    }

    const imageHandler = (e) => {
        setImage(e.target.files[0])

        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setImageDemo(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setImageDemo("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17ac8ee0067%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17ac8ee0067%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1875%22%20y%3D%2296.2765625%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")
        }
    }

    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/testimonial/view-by-id/${id}`, config)
            .then((response) => {
                setNameDemo(response.data.result.name)
                setName(response.data.result.name)
                setDescriptionDemo(response.data.result.description)
                setDescription(response.data.result.description)
                setImageDemo(`http://127.0.0.1:8000/testimonial/${response.data.result.image}`)
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
    
        if (image === null) {
            if (name.length === 0 || description.length === 0 ) {
                setError(true)
                setErrorMessage("All fields are required")
            } else {
                
                const formData = new FormData()
                formData.append('name', name)
                formData.append('description', description)
                
                dispatch(show())

                axios.get('/sanctum/csrf-cookie')
                    .then(response => {
                        axios.post(`/api/testimonial/update/${id}`, formData, config)
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
                                    setError(true)
                                    setErrorMessage(response.data.error)
                                    dispatch(hide())
                                }
                                else if (response.data.name) {
                                    setError(true)
                                    setErrorMessage(response.data.name)
                                    dispatch(hide())
                                }
                                else if(response.data.description){
                                    setError(true)
                                    setErrorMessage(response.data.description)
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
        } else {
            if (image.size > 2097152) {
                setError(true)
                setErrorMessage("Image size too large")
            } else if (name.length === 0 || description.length === 0 ) {
                setError(true)
                setErrorMessage("All fields are required")
            } else {

                const formData = new FormData()
                formData.append('name', name)
                formData.append('description', description)
                dispatch(show())

                axios.get('/sanctum/csrf-cookie')
                    .then(response => {
                        axios.post(`/api/testimonial/update/${id}`, formData, config)
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
                                else if(response.data.description){
                                    setError(true)
                                    setErrorMessage(response.data.description)
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
                            })
                    });

                const logoData = new FormData()
                logoData.append('image', image)
                
                dispatch(show())

                axios.get('/sanctum/csrf-cookie')
                    .then(response => {
                        axios.post(`/api/testimonial/update-logo/${id}`, logoData, config)
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
                                } else if (response.data.error) {
                                    setError(true)
                                    setErrorMessage(response.data.error)
                                    dispatch(hide())
                                }
                                else if (response.data.image) {
                                    setError(true)
                                    setErrorMessage(response.data.image)
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
                            })
                    });


                setError(false)
                setErrorMessage("")
            }
        }


    }

    return (
        <div className="admin__right__main__service__create">

            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="admin__right__main__service__create__form">
                        <h2>EDIT TESTIMONIAL</h2>
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
                                <label htmlFor="title">Name</label>
                                <input type="text" className="form-control" id="title" placeholder="Enter name" value={name} onChange={nameHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="url">Description</label>
                                <textarea className="form-control" id="url" placeholder="Enter Description" value={description} onChange={descriptionHandler}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">Image (Note: Image size should be below 2mb)</label>
                                <input type="file" className="form-control-file" onChange={(e) => imageHandler(e)} id="exampleFormControlFile1" />
                            </div>

                            <button type="submit" className="btn btn-primary card__btn">Update</button>
                        </form>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 card__demo__div">
                    <div className="admin__right__main__service__create__form">
                        <h2>DEMO</h2>
                    </div>
                    <div className="card demo__card" style={{ width: "70%" }}>
                        <img className="card-img-top" src={imageDemo} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{nameDemo}</h5>
                            <p className="card-text">{descriptionDemo}</p>
                            <div style={{ textAlign: "center" }}>
                                <button className="btn btn-primary card__btn">Edit</button>
                                <button className="btn btn-primary card__btn">Delete</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminTestimonialEdit
