import React, { useRef } from 'react'
import './MainService.css';
import { Container } from 'react-bootstrap'
import output from '../../Assets/icons/output.png'
import option from '../../Assets/icons/option.png'
import time from '../../Assets/icons/time.png'
import charges from '../../Assets/icons/charges.png'
import { Link } from 'react-router-dom'

const MainService = () => {

    const boxRef = useRef([]);

    const sliderMouseEnterHandler = (value) => {
        console.log(boxRef.current[value].childNodes)
        boxRef.current[value].style.background = 'rgba(0, 160, 139, 1)';
        boxRef.current[value].childNodes[0].style.display = "none";
        boxRef.current[value].childNodes[1].style.display = "grid";
    }

    const sliderMouseLeaveHandler = (value) => {
        boxRef.current[value].style.background = 'transparent';
        boxRef.current[value].childNodes[0].style.display = "grid";
        boxRef.current[value].childNodes[1].style.display = "none";
    }

    return (
        <div className="main__service__outer__div">
            <Container>
                <div className="main__service__inner__div">
                    <div className="heading__main__service">
                        TRANSFER OF VEHICLES - WITHIN KARNATAKA
                    </div>
                    <div className="description__main__service">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </div>
                    <div className="tag__line__main__service">
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </div>
                    <div className="pointers__main__service__div">
                        <div className="row" style={{ justifyContent: "center" }}>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 pointers__div">
                                <div className="pointers__inner__div" ref={el => boxRef.current[0] = el} onMouseEnter={() => sliderMouseEnterHandler(0)} onMouseLeave={() => sliderMouseLeaveHandler(0)}>
                                    <div className="visible__pointer__div">
                                        <img src={output} alt="output" />
                                        <div className="text">
                                            OUTPUT
                                        </div>
                                    </div>
                                    <div className="hover__pointer__div">
                                        <div className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 pointers__div">
                                <div className="pointers__inner__div" ref={el => boxRef.current[1] = el} onMouseEnter={() => sliderMouseEnterHandler(1)} onMouseLeave={() => sliderMouseLeaveHandler(1)}>
                                    <div className="visible__pointer__div">
                                        <img src={charges} alt="output" />
                                        <div className="text">
                                            CHARGES
                                        </div>
                                    </div>
                                    <div className="hover__pointer__div">
                                        <div className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 pointers__div">
                                <div className="pointers__inner__div" ref={el => boxRef.current[2] = el} onMouseEnter={() => sliderMouseEnterHandler(2)} onMouseLeave={() => sliderMouseLeaveHandler(2)}>
                                    <div className="visible__pointer__div">
                                        <img src={time} alt="output" />
                                        <div className="text">
                                            TIME TAKEN
                                        </div>
                                    </div>
                                    <div className="hover__pointer__div">
                                        <div className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>

                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 pointers__div">
                                <div className="pointers__inner__div" ref={el => boxRef.current[3] = el} onMouseEnter={() => sliderMouseEnterHandler(3)} onMouseLeave={() => sliderMouseLeaveHandler(3)}>
                                    <div className="visible__pointer__div">
                                        <img src={option} alt="output" />
                                        <div className="text">
                                            OPTIONS
                                        </div>
                                    </div>
                                    <div className="hover__pointer__div">
                                        <div className="list">
                                            <ul>
                                                <li><p>1) In Person</p></li>
                                                <li><p className="active">2) Online</p></li>
                                                <li className="last__li"><p>3) Representative</p></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="start__application__btn">
                        <Link>START APPLICATION &gt;&gt;</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MainService
