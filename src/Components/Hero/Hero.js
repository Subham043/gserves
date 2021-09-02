import React from 'react'
import { Container } from 'react-bootstrap';
import "./Hero.css"
import { GrNext } from "react-icons/gr";
import { BsDot } from "react-icons/bs";
import checked from "../../Assets/icons/tick.png"
import delivery from "../../Assets/icons/delivery.png"
import documents from "../../Assets/icons/document.png"
import laptop from "../../Assets/icons/service.png"
import notepad from "../../Assets/icons/application.png"
import printer from "../../Assets/icons/print.png"
import employee from "../../Assets/icons/employee.png"
import ReactTooltip from 'react-tooltip';


const Hero = () => {

    
    return (
        <div className="hero__outer__div">
            <Container>
                <div className="hero__inner__div">
                    <div className="tag__line__div">
                        <div className="row" style={{ justifyContent: "center" }}>
                            <div className="tagline">
                                <p className="initial__text">Great Experience with Gserves service</p>
                                <p>Very informative and structured procedures</p>
                            </div>
                            <div className="tagimage">
                                <img src={employee} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="description__div">
                        <div className="heading">
                            <p><span>G</span>Serves</p>
                        </div>
                        <div className="tags_div">
                            simple | Convenient | Transparent
                        </div>
                        <div className="description">
                            <p><b>Gserves</b> is an easy-to-use new age platform for availing the services provided by Government departments like Licenses, Certificates, Approvals, Registration, etc. , With <b>GServes</b>, enjoy the convenience of doorstep collection and delivery of documents, at absolutely transparent price </p>
                        </div>
                    </div>
                </div>
                <div className="hero__services__div__outer">
                    <div className="hero__services__div__heading">
                        How GServes Works
                    </div>
                    <div className="hero__services__div__content">
                        <div className="row">
                            <div data-tip data-for='choose' className="hero__services__img__div">
                                
                                <div>
                                    <img src={laptop} alt="" />
                                    <p>Choose the service</p>
                                </div>
                                <ReactTooltip id='choose' place="bottom" type="dark" effect="float">
                                    <div className="" style={{maxWidth:"200px"}}>
                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                    </div>
                                </ReactTooltip>

                                
                            </div>
                            <div className="hero__services__arrow__div">
                                <ul>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>

                                    <li><GrNext className="list__arrow" /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>

                                </ul>
                            </div>
                            <div data-tip data-for='application' className="hero__services__img__div">
                                
                                    <div>
                                        <img src={notepad} alt="" />
                                        <p>Fill the application with required details</p>
                                    </div>
                                    <ReactTooltip id='application' place="bottom" type="dark" effect="float">
                                        <div className="" style={{maxWidth:"200px"}}>
                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                        </div>
                                    </ReactTooltip>
                               
                            </div>
                            <div className="hero__services__arrow__div">
                                <ul>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>

                                    <li><GrNext className="list__arrow" /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>

                                </ul>
                            </div>
                            <div data-tip data-for='print' className="hero__services__img__div">
                                
                                    <div>
                                        <img src={printer} alt="" />
                                        <p>print the completed Application in specified format</p>
                                    </div>
                                    <ReactTooltip id='print' place="bottom" type="dark" effect="float">
                                        <div className="" style={{maxWidth:"200px"}}>
                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                        </div>
                                    </ReactTooltip>
                               
                            </div>
                            <div className="hero__services__arrow__div">
                                <ul>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>

                                    <li><GrNext className="list__arrow" /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>

                                </ul>
                            </div>
                            <div data-tip data-for='hand' className="hero__services__img__div">
                                
                                    <div>
                                        <img src={documents} alt="" />
                                        <p>Hand over the documents to GServes</p>
                                    </div>
                                    <ReactTooltip id='hand' place="bottom" type="dark" effect="float">
                                        <div className="" style={{maxWidth:"200px"}}>
                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                        </div>
                                    </ReactTooltip>
                                
                            </div>
                            <div className="hero__services__arrow__div">
                                <ul>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>

                                    <li><GrNext className="list__arrow" /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>

                                </ul>
                            </div>
                            <div data-tip data-for='docs' className="hero__services__img__div">
                                
                                    <div>
                                        <img src={checked} alt="" />
                                        <p>Documents verified & Submitted by GServes</p>
                                    </div>
                                    <ReactTooltip id='docs' place="bottom" type="dark" effect="float">
                                        <div className="" style={{maxWidth:"200px"}}>
                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                        </div>
                                    </ReactTooltip>
                               
                            </div>
                            <div className="hero__services__arrow__div">
                                <ul>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>

                                    <li><GrNext className="list__arrow" /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>
                                    <li><BsDot /></li>

                                </ul>
                            </div>
                            <div data-tip data-for='deliver' className="hero__services__img__div">
                                
                                    <div>
                                        <img src={delivery} alt="" />
                                        <p>Application processed and service delivered</p>
                                    </div>
                                    <ReactTooltip id='deliver' place="bottom" type="dark" effect="float">
                                        <div className="" style={{maxWidth:"200px"}}>
                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                        </div>
                                    </ReactTooltip>
                               
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default Hero
