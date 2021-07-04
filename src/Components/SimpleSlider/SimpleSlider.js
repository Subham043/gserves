import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import "./SimpleSlider.css"
import aadhar from "../../Assets/icons/aadhar.png"
import travel from "../../Assets/icons/transport.png"
import degree from "../../Assets/icons/bbmp.png"
import driving from "../../Assets/icons/license.png"
import light from "../../Assets/icons/bescom.png"
import passport from "../../Assets/icons/passport.png"

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


export default class SimpleSlider extends Component {
    render() {
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

        const sliderItems = [
            { id: 1, image: aadhar, text: "Aadhar" },
            { id: 2, image: passport, text: "Passport" },
            { id: 3, image: travel, text: "Transport" },
            { id: 4, image: degree, text: "BBMP" },
            
            { id: 6, image: light, text: "BESCOM" },
            // { id: 5, image: driving, text: "Driving License" },
        ]
        return (
            <div className="service__slider__outer__div">

                <Slider {...settings}>
                   
                     {sliderItems.map((item) => {
                        return (<div key={item.id}>
                            <div className="service__slider__inner__div">
                                <div className="service__slider__image__outer">
                                   
                                        <div className="service__slider__image__div">
                                            <img src={item.image} alt="" />
                                        </div>
                                    
                                </div>
                                <div className="service__slider__text">
                                {item.text}
                                </div>
                            </div>
                        </div>)
                    })}
                   
                </Slider>
            </div>
        );
    }
}
