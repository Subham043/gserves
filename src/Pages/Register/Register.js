import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import SmallBanner from '../../Components/SmallBanner/SmallBanner'
import banner from '../../Assets/banner.jpg'
import AuthHero from '../../Components/AuthHero/AuthHero'
import RegisterForm from '../../Components/Register/RegisterForm'

const Register = () => {
    return (
        <div>
            <Navbar />
            <SmallBanner bannerImg={banner} />
            <AuthHero heading="registration" form={<RegisterForm />} />
            <Footer />
        </div>
    )
}

export default Register
