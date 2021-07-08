import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import SmallBanner from '../../Components/SmallBanner/SmallBanner'
import banner from '../../Assets/banner.jpg'
import AuthHero from '../../Components/AuthHero/AuthHero'
import OtpForm from '../../Components/OtpForm/OtpForm'
import '../Login/Login.css'

const Otp = () => {
    return (
        <div className="login__form__main">
            <Navbar />
            <SmallBanner bannerImg={banner} />
            <AuthHero heading="OTP Verification" form={<OtpForm />} />
            <Footer />
        </div>
    )
}

export default Otp