import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import Face1 from "../../Assets/icons/testimonial.png"
import "./Testimonial.css"

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
       <GrNext
       className={`${className} , slick__next`}
        style={{ ...style }}
        onClick={onClick}
       />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <GrPrevious
        className={`${className} , slick__prev`}
        style={{ ...style }}
        onClick={onClick}
      />
    );
  }

export class Testimonial extends Component {

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
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1025,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                  }
                },
                {
                  breakpoint: 600,
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
        return (
            <div className="testimonial__outer__div">
                <Container>

                    <div className="testimonial__headeing">
                        Testimonials
                    </div>

                    <div className="testimonial__slider">
                        <Slider {...settings}>
                            <div>
                               <div className="testimonial__div">
                                    <div className="testimonial__image">
                                        <img src={Face1} alt="" />
                                    </div>
                                    <div className="testimonial__comment">
                                        <p className="comment">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                        <p className="name">Sunil</p>
                                    </div>
                               </div>
                            </div>
                            <div>
                                <div className="testimonial__div">
                                    <div className="testimonial__image">
                                        <img src={Face1} alt="" />
                                    </div>
                                    <div className="testimonial__comment">
                                    <p className="comment">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                        <p className="name">Sunil</p>
                                    </div>
                               </div>
                            </div>
                            <div>
                                <div className="testimonial__div">
                                    <div className="testimonial__image">
                                        <img src={Face1} alt="" />
                                    </div>
                                    <div className="testimonial__comment">
                                    <p className="comment">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                        <p className="name">Sunil</p>
                                    </div>
                               </div>
                            </div>
                            <div>
                                <div className="testimonial__div">
                                    <div className="testimonial__image">
                                        <img src={Face1} alt="" />
                                    </div>
                                    <div className="testimonial__comment">
                                    <p className="comment">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                        <p className="name">Sunil</p>
                                    </div>
                               </div>
                            </div>
                            <div>
                                <div className="testimonial__div">
                                    <div className="testimonial__image">
                                        <img src={Face1} alt="" />
                                    </div>
                                    <div className="testimonial__comment">
                                    <p className="comment">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                        <p className="name">Sunil</p>
                                    </div>
                               </div>
                            </div>
                            
                        </Slider>
                    </div>

                </Container>
            </div>
        )
    }
}

export default Testimonial
