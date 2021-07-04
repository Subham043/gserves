import React from 'react'
import "./Banner.css";
import { Container } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar';
import SimpleSlider from '../SimpleSlider/SimpleSlider';

const Banner = () => {
    return (
        <div className="banner__div">
            <div className="inner__div">
                <Container>
                    <div className="banner__heading">
                        <p>HOW CAN WE HELP YOU TODAY?</p>
                    </div>
                    <div className="search__div">
                        <SearchBar />
                    </div>

                    <div className="slider__div">
                        <SimpleSlider />
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Banner
