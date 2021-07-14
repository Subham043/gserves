import React from 'react'
import './LoadingModal.css'
import { useSelector } from "react-redux"
import { selectLoaderModal } from "../../features/loaderModalSlice"

const LoadingModal = () => {

    const loaderModal = useSelector(selectLoaderModal)

    if(loaderModal === true){
        document.querySelector('body').style.position = "fixed";
        document.querySelector('body').style.width = "100%";
    }else{
        document.querySelector('body').style.position = "static";
        document.querySelector('body').style.width = "100%";
    }
    

    return (
        <div>
            {loaderModal === true ?

            <div className="Loader__div">
                <div className="inner__Loader__div">
                <div className="loadingio-spinner-wedges-ib02bbdgo2"><div className="ldio-poo4y6sv1h">
                    <div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
                </div></div>
                </div>
            </div>
            :
            null
            }
        </div>
    )
}

export default LoadingModal
