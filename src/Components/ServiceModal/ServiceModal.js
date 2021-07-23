import React from 'react'
import './ServiceModal.css'
import { useSelector } from "react-redux"
import { selectServiceModal } from "../../features/serviceModalSlice"
import { AiOutlineClose } from "react-icons/ai";
import { hideServiceModal } from "../../features/serviceModalSlice"
import { useDispatch } from "react-redux"

const ServiceModal = () => {

    const serviceModal = useSelector(selectServiceModal)

    const dispatch = useDispatch();
    const handleCloseServiceModal = ()=> {
        dispatch(hideServiceModal())
    }

    if(serviceModal === true){
        document.querySelector('body').style.position = "fixed";
        document.querySelector('body').style.width = "100%";
    }else{
        document.querySelector('body').style.position = "static";
        document.querySelector('body').style.width = "100%";
    }
    

    return (
        <div>
            {serviceModal === true ?

            <div className="service__modal__div">
                <div id="modal_div" className={`${serviceModal === true ? "inner__service__modal__div inner__service__modal__div__show" : "inner__service__modal__div inner__service__modal__div__hide"}`}>
                    <div className="close__button__div">
                        <button onClick={handleCloseServiceModal}><AiOutlineClose /></button>
                    </div>
                    <div className="service__modal__form">
                        <form>
                            <h2>Mention Your Requirement</h2>
                            <textarea placeholder="Service"></textarea>
                            <input placeholder="How soon do you require" />
                            <input placeholder="Name" />
                            <input placeholder="Mobile" />
                            <input placeholder="Email" />
                            <button type="submit">Request Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            :
            null
            }
        </div>
    )
}

export default ServiceModal
