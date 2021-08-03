import React, { useEffect, useState } from 'react';
import './ServiceFormHero.css';
import { Container } from 'react-bootstrap';
import { useDispatch } from "react-redux"
import { show, hide } from "../../features/loaderModalSlice"
import axios from '../../axios'
import { useHistory, useParams} from 'react-router-dom'

const ServiceFormHero = (props) => {

    const dispatch = useDispatch();
    let history = useHistory();
    const {sub_service_id} = useParams();
    const [name, setName] = useState("");

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
        <div className="service__form__hero__outer__div">
            <Container>
                <div className="service__form__hero__inner__div">

                    <div className="description__div">

                        <div className="heading">
                            <p>{name}</p>
                        </div>

                        
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default ServiceFormHero
