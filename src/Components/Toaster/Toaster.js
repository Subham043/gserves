import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { selectToaster } from "../../features/toasterSlice"

import 'react-toastify/dist/ReactToastify.css';

const Toaster = () => {

    const toaster = useSelector(selectToaster)
    
    const notifySuccess = (message) => toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: toaster.timeline
      });

    const notifyError = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: toaster.timeline
      });

    if(toaster.toasterStatus === true && toaster.toasterType === "success"){
        notifySuccess(toaster.toasterMessage);
    }else if(toaster.toasterStatus === true && toaster.toasterType === "error"){
        notifyError(toaster.toasterMessage);
    }

    return (
        <div>
            <div>
                <ToastContainer />
                
            </div>
        </div>
    )
}

export default Toaster
