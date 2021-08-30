import React, { useEffect, useState } from 'react'
import './MainServiceProcedure.css'
import { Container } from 'react-bootstrap'
import { show, hide } from "../../features/loaderModalSlice"
import { useDispatch } from 'react-redux'
import axios from "../../axios"
import { useHistory, useParams} from 'react-router-dom'

const MainServiceProcedure = () => {

    const [name, setName] = useState("");
    const {sub_service_id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(sub_service_id === undefined){
            history.push('/')
        }
    }, [sub_service_id])

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/sub-service/view-by-id/${sub_service_id}`)
            .then((response) => {
                if(response.data.result.length===0){
                    history.push('/')
                }else{
                    setName(response.data.result[0].name)
                }
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })
    }, [dispatch, sub_service_id])


    return (
        <div className="main__service__procedure__outer__div">
            <Container>
                <div className="main__service__procedure_heading">
                    Procedure for {name}
                </div>
                <div className="main__service__procedure__inner__div">
                    <div className="main__service__procedure__list">
                        <span className="main__service__procedure__list__no">1</span>
                        <span className="main__service__procedure__list__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</span>
                    </div>
                    <div className="main__service__procedure__list">
                        <span className="main__service__procedure__list__no">2</span>
                        <span className="main__service__procedure__list__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                    </div>
                    <div className="main__service__procedure__list">
                        <span className="main__service__procedure__list__no">3</span>
                        <span className="main__service__procedure__list__text">hello just a random text</span>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MainServiceProcedure
