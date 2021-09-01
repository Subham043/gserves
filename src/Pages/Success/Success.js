import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import SmallBanner from '../../Components/SmallBanner/SmallBanner'
import MainSuccess from '../../Components/MainSuccess/MainSuccess'
import ServiceFormHero from '../../Components/ServiceFormHero/ServiceFormHero'
import banner from '../../Assets/banner.jpg'
import './Success.css'

const Success = () => {
    return (
        <div className="service__main">
            <Navbar />
            <SmallBanner bannerImg={banner} />
            <ServiceFormHero />
            <MainSuccess />
            <Footer />
        </div>
    )
}

export default Success
