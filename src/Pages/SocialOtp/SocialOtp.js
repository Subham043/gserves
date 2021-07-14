import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import SmallBanner from '../../Components/SmallBanner/SmallBanner'
import banner from '../../Assets/banner.jpg'
import AuthHero from '../../Components/AuthHero/AuthHero'
import SocialOtpForm from '../../Components/SocialOtpForm/SocialOtpForm'
import '../Login/Login.css'


const SocialOtp = () => {
    return (
        <div className="login__form__main">
            <Navbar />
            <SmallBanner bannerImg={banner} />
            <AuthHero heading="OTP Verification" form={<SocialOtpForm />} />
            <Footer />
        </div>
    )
}

export default SocialOtp