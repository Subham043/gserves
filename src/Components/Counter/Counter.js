import React from 'react'
import "./Counter.css";
import { Container } from 'react-bootstrap';

const Counter = () => {
    return (
        <div className="counter__div">
            <div className="counter__inner__div">

                <Container>
                    <div className="counter__heading">
                        <p>WHY GServes</p>
                    </div>

                    <div className="counter_text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry injected humour, or non-characteristic words etc. </p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry injected humour, or non-characteristic words etc. </p>
                    </div>

                    <div>
                        <div className="row">
                            <div className="col-lg-3 col-sm-12 col-md-6 col-xl-3 counter__div__main">
                                <div className="main__inner_div">
                                    <div className="first__inner__counter__div">
                                        <div className="scnd__inner__counter__div">
                                            25
                                        </div>
                                    </div>
                                </div>
                                <div className="main__inner_text">
                                    text text
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-12 col-md-6 col-xl-3 counter__div__main">
                                <div className="main__inner_div">
                                    <div className="first__inner__counter__div">
                                        <div className="scnd__inner__counter__div">
                                            110
                                        </div>
                                    </div>
                                </div>
                                <div className="main__inner_text">
                                    text text
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-12 col-md-6 col-xl-3 counter__div__main">
                                <div className="main__inner_div">
                                    <div className="first__inner__counter__div">
                                        <div className="scnd__inner__counter__div">
                                            250+
                                        </div>
                                    </div>
                                </div>
                                <div className="main__inner_text">
                                    text text
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-12 col-md-6 col-xl-3 counter__div__main">
                                <div className="main__inner_div">
                                    <div className="first__inner__counter__div">
                                        <div className="scnd__inner__counter__div">
                                            100+
                                        </div>
                                    </div>
                                </div>
                                <div className="main__inner_text">
                                    text text
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

            </div>
        </div>
    )
}

export default Counter
