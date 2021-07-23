import React, { useState } from 'react'
import './AdminServiceCreate.css'
import { show, hide } from "../../features/loaderModalSlice"
import axios from "../../axios"
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminUser } from "../../features/adminUserSlice"

const AdminServiceCreate = () => {

    const dispatch = useDispatch();
    const adminUser = useSelector(selectAdminUser)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [logo, setLogo] = useState(null)
    const [titleDemo, setTitleDemo] = useState("Title goes here");
    const [priceDemo, setPriceDemo] = useState("Price goes here");
    const [logoDemo, setLogoDemo] = useState("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17ac8ee0067%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17ac8ee0067%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1875%22%20y%3D%2296.2765625%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");

    const titleHandler = (e) => {
        setTitle(e.target.value)
        if (e.target.value.length === 0) {
            setTitleDemo("Title goes here")
        } else {
            setTitleDemo(e.target.value)
        }
    }
    const priceHandler = (e) => {
        setPrice(e.target.value)
        if (e.target.value.length === 0) {
            setPriceDemo("Price goes here")
        } else {
            setPriceDemo(e.target.value)
        }
    }

    const logoHandler = (e) => {
        setLogo(e.target.files[0])

        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setLogoDemo(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setLogoDemo("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17ac8ee0067%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17ac8ee0067%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1875%22%20y%3D%2296.2765625%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")
        }
    }

    const config = {
        headers: { Authorization: `Bearer ${adminUser}` }
    };


    const serviceFormHandler = (e) => {
        e.preventDefault();
        setError(false)
        setErrorMessage("")

        if( logo===null){
            setError(true)
            setErrorMessage("Select an image file")
        }else if( logo.size > 2097152){
            setError(true)
            setErrorMessage("Image size too large")
        }else if(title.length === 0 || price.length === 0){
            setError(true)
            setErrorMessage("All fields are required")
        }else{
           
            const formData = new FormData() 
            formData.append('image', logo)
            formData.append('title', title)
            formData.append('price', price)
            dispatch(show())

            axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post(`/api/service/create`, formData, config)
                    .then((response) => {
                        
                        if(response.data.result){
                            dispatch(hide())
                            console.log(response.data.result)
                        }else if(response.data.error){
                            setError(true)
                            setErrorMessage(response.data.error)
                            dispatch(hide())
                        }
                        else if(response.data.title){
                            setError(true)
                            setErrorMessage(response.data.title)
                            dispatch(hide())
                        }
                        else if(response.data.price){
                            setError(true)
                            setErrorMessage(response.data.price)
                            dispatch(hide())
                        }
                        else if(response.data.logo){
                            setError(true)
                            setErrorMessage(response.data.logo)
                            dispatch(hide())
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        dispatch(hide())
                    })
            });

           

            setLogo(null);
            setTitle("");
            setPrice("");
            setError(false)
            setErrorMessage("")
        }
    }

    return (
        <div className="admin__right__main__service__create">

            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="admin__right__main__service__create__form">
                        <h2>CREATE NEW SERVICE</h2>
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
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" placeholder="Enter title" value={title} onChange={titleHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input type="text" className="form-control" id="price" placeholder="Enter price" value={price} onChange={priceHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">Logo</label>
                                <input type="file" className="form-control-file" onChange={(e) => logoHandler(e)} id="exampleFormControlFile1" />
                            </div>

                            <button type="submit" className="btn btn-primary card__btn">Create</button>
                        </form>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 card__demo__div">
                    <div className="admin__right__main__service__create__form">
                        <h2>DEMO</h2>
                    </div>
                    <div className="card demo__card" style={{ width: "70%" }}>
                        <img className="card-img-top" src={logoDemo} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{titleDemo}</h5>
                            <p className="card-text">Rs. {priceDemo}</p>
                            <div style={{ textAlign: "center" }}>
                                <button className="btn btn-primary card__btn">Edit</button>
                                <button className="btn btn-primary card__btn">Delete</button>
                                <button className="btn btn-primary card__btn">View Sub-Services</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminServiceCreate
