import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import SmallBanner from '../../Components/SmallBanner/SmallBanner'
import MainService from '../../Components/MainService/MainService'
import MainServiceProcedure from '../../Components/MainServiceProcedure/MainServiceProcedure'
import banner from '../../Assets/banner.jpg'
import './Service.css'

const Service = () => {
    return (
        <div className="service__main">
            <Navbar />
            <SmallBanner bannerImg={banner} />
            <MainService />
            <MainServiceProcedure />
            <Footer />
        </div>
    )
}

export default Service
