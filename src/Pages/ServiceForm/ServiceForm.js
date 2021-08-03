import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import SmallBanner from '../../Components/SmallBanner/SmallBanner'
import MainServiceForm from '../../Components/MainServiceForm/MainServiceForm'
import ServiceFormHero from '../../Components/ServiceFormHero/ServiceFormHero'
import banner from '../../Assets/banner.jpg'
import './ServiceForm.css'

const ServiceForm = () => {
    return (
        <div className="service__main">
            <Navbar />
            <SmallBanner bannerImg={banner} />
            <ServiceFormHero />
            <MainServiceForm />
            <Footer />
        </div>
    )
}

export default ServiceForm
