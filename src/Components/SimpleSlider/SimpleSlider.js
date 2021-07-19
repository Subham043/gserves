import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import "./SimpleSlider.css"
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"
import { useDispatch } from "react-redux"

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <GrNext
            className={`${className} , service__slider__arrow`}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <GrPrevious
            className={`${className} , service__slider__arrow`}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}


const SimpleSlider = () => {

    const settings = {
        dots: false,
        infinite: true,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 601,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [navServices, setNavServices] = useState([]);

    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(show())
        axios.get(`/api/service/view`)
            .then((response) => {
                setNavServices(response.data.result)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })
    }, [])

    const [subNavServices, setSubNavServices] = useState([]);

    useEffect(() => {
        dispatch(show())
        axios.get(`/api/sub-service/view`)
            .then((response) => {
                setSubNavServices(response.data.result)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })
    }, [])


    let subServ = []
    let nonSubServ = []
    let obj = {}
    for (let i = 0; i < navServices.length; i++) {
        obj.id = navServices[i].id
        obj.title = navServices[i].title
        obj.logo = navServices[i].logo
        obj.price = navServices[i].price
        for (let j = 0; j < subNavServices.length; j++) {
            if (subNavServices[j].service_id === navServices[i].id) {
                nonSubServ.push(subNavServices[j])
            }
        }
        if (nonSubServ.length !== 0) {
            obj.sub_services = nonSubServ
            nonSubServ = [];
        } else {
            obj.sub_services = null
            nonSubServ = [];
        }
        subServ.push(obj);
        obj = {};

    }

    
    const sliderMouseEnterHandler = (i) => {
        boxRef.current[i].style.background = 'rgba(0, 160, 139, 1)';
        boxRef.current[i].style.borderTopLeftRadius = '10px';
        boxRef.current[i].style.borderTopRightRadius = '10px';
        boxRef.current[i].style.paddingBottom = '15px'
        if(document.querySelector(`#service__slider__inner__div_hover_div${i}`) !== null){
            document.querySelector(`#service__slider__inner__div_hover_div${i}`).style.display = 'block';
            heightFunc(i)
        }
        
    }

    const sliderMouseLeaveHandler = (i) => {
        boxRef.current[i].style.background = 'transparent';
        boxRef.current[i].style.borderTopLeftRadius = '0px';
        boxRef.current[i].style.borderTopRightRadius = '0px';
        boxRef.current[i].style.paddingBottom = '0px'
        if(document.querySelector(`#service__slider__inner__div_hover_div${i}`) !== null){
            document.querySelector(`#service__slider__inner__div_hover_div${i}`).style.display = 'none';
        }
    }

    const boxRef = React.useRef([]);

    const heightFunc = (i) => {
        let height = document.querySelector(`#service__slider__inner__div_hover_div${i}`).offsetHeight
        document.querySelector(`#service__slider__inner__div_hover_div${i}`).style.bottom = '-' + height + 'px';
    }


    return (
        <div className="service__slider__outer__div" style={{ position: 'relative' }}>

            <Slider {...settings}>

                {navServices.map((item, i) => {
                    return (<div key={item.id} ref={el => boxRef.current[i] = el} onMouseEnter={() => sliderMouseEnterHandler(i)} onMouseLeave={() => sliderMouseLeaveHandler(i)}>
                        <div className="service__slider__inner__div">
                            <div className="service__slider__image__outer">

                                <div className="service__slider__image__div">
                                    <img src={`http://127.0.0.1:8000/service/logo/${item.logo}`} alt="" />
                                </div>

                            </div>
                            <div className="service__slider__text">
                                {item.title}
                            </div>
                        </div>

                    </div>)
                })}

            </Slider>
            {/* {sliderItems.map((item, i) => {
                return (<div key={item.id} className="service__slider__inner__div_hover_div" id={`service__slider__inner__div_hover_div${i}`} style={{ display: "none" }} onMouseEnter={() => sliderMouseEnterHandler(i)} onMouseLeave={() => sliderMouseLeaveHandler(i)}>
                    <div className="row">

                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                            <div className="service__slider__inner__div_hover_div_text">
                                <p>Hello</p>
                            </div>
                        </div>

                    </div>
                </div>)

            })} */}

            {
                subServ.map((item, i) => {
                    if (item.sub_services != null) {

                        return (<div key={item.id} className="service__slider__inner__div_hover_div" id={`service__slider__inner__div_hover_div${i}`} style={{ display: "none" }} onMouseEnter={() => sliderMouseEnterHandler(i)} onMouseLeave={() => sliderMouseLeaveHandler(i)}>
                            <div className="row">
                            {item.sub_services.map(innerElement => (

                                <div key={innerElement.id} className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                    <div className="service__slider__inner__div_hover_div_text">
                                        <p> {innerElement.name}</p>
                                    </div>
                                </div>


                            ))}
                            </div>
                            </div>)

                    } else {
                        return (null)
                    }


                })
            }

        </div>
    );

}


export default SimpleSlider;
