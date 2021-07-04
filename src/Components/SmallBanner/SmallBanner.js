import React from 'react'
import './SmallBanner.css';
import { Container } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar';
import SimpleSlider from '../SimpleSlider/SimpleSlider';

const SmallBanner = (props) => {
    return (
        <div className="small__banner__div" style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.bannerImg})`}}>
            <div className="inner__div">
                <Container>
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

export default SmallBanner
