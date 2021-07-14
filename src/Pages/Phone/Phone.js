import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import SmallBanner from '../../Components/SmallBanner/SmallBanner'
import banner from '../../Assets/banner.jpg'
import AuthHero from '../../Components/AuthHero/AuthHero'
import PhoneForm from '../../Components/PhoneForm/PhoneForm'
import '../Login/Login.css'

const Phone = () => {
    return (
        <div className="login__form__main">
            <Navbar />
            <SmallBanner bannerImg={banner} />
            <AuthHero heading="Phone" form={<PhoneForm />} />
            <Footer />
        </div>
    )
}

export default Phone