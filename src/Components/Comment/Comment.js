import React from 'react'
import { Container } from 'react-bootstrap'
import './Comment.css'

const Comment = () => {
    return (
        <div className="comment__outer__div">
            <Container>
                <div className="comment__inner__div">
                    <div className="comment__inner__div__head">
                        <div>Comment</div>
                        <button>Enter New Comment</button>
                    </div>
                    <div className="comment__inner__div__body">
                        <div className="comment__inner__div__body__comment">
                            <div className="comment__inner__div__comment__name">
                                <div className="dot__div__comment"></div>
                                <div className="name__div__comment">
                                    <b>Rajesh</b> on 27.03.2019
                                </div>
                            </div>
                            <div className="comment__inner__div__comment__text__body">
                                <div className="comment__inner__div__comment__text">
                                    I want to transfer my vehicle which i bought recently. How long does it take generally for the entire process
                                </div>
                                <div className="comment__inner__div__comment__btn__group">
                                    <button style={{backgroundColor:"#ccc"}}>Reply</button>
                                    <button style={{backgroundColor:"#818181", color:"#fff"}}>Report</button>
                                </div>
                            </div>
                            <div className="comment__inner__div__comment__text__body reply__body">
                                <div className="comment__inner__div__comment__text">
                                    Replied by - <b>Karthik</b> on 28.03.2019 <br/>
                                    I want to transfer my vehicle which i bought recently. How long does it take generally for the entire process
                                </div>
                                <div className="comment__inner__div__comment__btn__group">
                                    <button style={{backgroundColor:"#ccc"}}>Reply</button>
                                    <button style={{backgroundColor:"#818181", color:"#fff"}}>Report</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Comment
