import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import SmallBanner from '../../Components/SmallBanner/SmallBanner'
import banner from '../../Assets/banner.jpg'
import AuthHero from '../../Components/AuthHero/AuthHero'
import LoginForm from '../../Components/Login/LoginForm'
import './Login.css'

const Login = () => {
    return (
        <div className="login__form__main">
            <Navbar />
            <SmallBanner bannerImg={banner} />
            <AuthHero heading="Login" form={<LoginForm />} />
            <Footer />
        </div>
    )
}

export default Login
