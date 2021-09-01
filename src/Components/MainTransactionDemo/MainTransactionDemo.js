import React from 'react'
import './MainTransactionDemo.css';
import { Container } from 'react-bootstrap'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import ReactTooltip from 'react-tooltip';

const MainTransactionDemo = () => {



    return (
        <div className="main__transaction__outer__div">
            <Container>
                <div className="main__transaction__inner__div">
                    <div className="main__transaction__inner__display__div">
                        <div className="main__transaction__inner__display__id">
                            <div className="main__transaction__inner__display__id__description">
                                <div className="main__transaction__inner__display__id__head">
                                    Reference ID
                                </div>
                                <div className="main__transaction__inner__display__id__body">
                                    : <b>1234567890 - XXX</b>
                                </div>
                            </div>

                            <div className="main__transaction__inner__display__pagination">
                                <button className="arrow__btn"><MdKeyboardArrowLeft /></button>
                                <div className="page__num">1</div>
                                <button className="arrow__btn"><MdKeyboardArrowRight /></button>
                                <div className="total__page__num">10</div>
                            </div>
                        </div>
                        <div className="main__transaction__inner__display__service">
                            <div className="main__transaction__inner__display__id__description">
                                <div className="main__transaction__inner__display__id__head">
                                    Service Description
                                </div>
                                <div className="main__transaction__inner__display__id__body">
                                    : <b>Transafer of Vehicle - Within Karnataka</b>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main__transaction__inner__display__div">
                        <div className="main__transaction__inner__display__service">
                            <div className="main__transaction__inner__display__id__description">
                                <div className="main__transaction__inner__display__id__head">
                                    Current Status
                                </div>
                                <div className="main__transaction__inner__display__id__body">
                                    : <b>Application Submitted</b>
                                </div>
                            </div>
                        </div>
                        <div className="main__transaction__inner__display__service">
                            <div className="main__transaction__inner__display__id__description">
                                <div className="main__transaction__inner__display__id__head">
                                    Detailed Status
                                </div>
                                <div className="main__transaction__inner__display__id__body">
                                    : <b>Being processed by RTO</b>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main__transaction__inner__display__div__greener new__greener">
                        <div className="main__transaction__inner__display__div__whiter">

                            <div className="main__transaction__inner__display__div__whiter__inner">
                                <div className="main__transaction__inner__display__div__whiter__inner__head">
                                    Application collection mode
                                </div>
                                <div className="main__transaction__inner__display__div__whiter__inner__body">
                                    <div className="form-group" >
                                        <select className="form-control" id="exampleFormControlSelect1">
                                            <option></option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="main__transaction__inner__display__div__whiter__inner">
                                <div className="main__transaction__inner__display__div__whiter__inner__head">
                                    Document dispatch mode
                                </div>
                                <div className="main__transaction__inner__display__div__whiter__inner__body">
                                    <div className="form-group" >
                                        <select className="form-control" id="exampleFormControlSelect1">
                                            <option></option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="main__transaction__inner__display__div__whiter__inner">
                                <div className="main__transaction__inner__display__div__whiter__inner__head">
                                    Mode of payment
                                </div>
                                <div className="main__transaction__inner__display__div__whiter__inner__body">
                                    <div className="form-group" >
                                        <select className="form-control" id="exampleFormControlSelect1">
                                            <option></option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="main__transaction__inner__display__div__whiter__inner">
                                <div className="main__transaction__inner__display__div__whiter__inner__head">
                                    Payment Status
                                </div>
                                <div className="main__transaction__inner__display__div__whiter__inner__body inner__body__btn">
                                    <div data-tip data-for='money'><BiRupee /> 012345</div>
                                    <ReactTooltip id='money' place="bottom" type="dark" effect="float">
                                        <div className="money__tooltip">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Govt charges</td>
                                                        <td>: 0000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Gserves Fees</td>
                                                        <td>: 0000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total Amount</td>
                                                        <td>: 0000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Already Paid</td>
                                                        <td>: 0000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Net Due</td>
                                                        <td>: 0000</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </ReactTooltip>
                                    <button>Pay Now</button>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="main__transaction__inner__display__div">
                        <div className="main__transaction__inner__display__service">
                            <div className="main__transaction__inner__display__id__description">
                                <div className="main__transaction__inner__display__id__head">
                                    Applicatant Name
                                </div>
                                <div className="main__transaction__inner__display__id__body">
                                    : <b>Sunil KM</b>
                                </div>
                            </div>
                        </div>
                        <div className="main__transaction__inner__display__service">
                            <div className="main__transaction__inner__display__id__description">
                                <div className="main__transaction__inner__display__id__head">
                                    User Name
                                </div>
                                <div className="main__transaction__inner__display__id__body">
                                    : <b>Sunil KM</b>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main__transaction__inner__display__div__btn">
                        <button>View / Edit Form</button>
                        <button>Supporting Documents</button>
                        <button>Download Application</button>
                        <button>Email Application</button>
                        <button style={{ background: "#818181", color: "white" }}>Close</button>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default MainTransactionDemo
