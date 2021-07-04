import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Banner from '../../Components/Banner/Banner'
import Counter from '../../Components/Counter/Counter'
import Contact from '../../Components/Contact/Contact'
import Footer from '../../Components/Footer/Footer'
import Testimonial from '../../Components/Testimonial/Testimonial'
import Hero from '../../Components/Hero/Hero'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <Hero/>
            <Counter />
            <Testimonial />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home
