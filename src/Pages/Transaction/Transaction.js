import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import SmallBanner from '../../Components/SmallBanner/SmallBanner'
import MainTransaction from '../../Components/MainTransaction/MainTransaction'
import MainTransactionDemo from '../../Components/MainTransactionDemo/MainTransactionDemo'
import TransactionHero from '../../Components/TransactionHero/TransactionHero'
import Comment from '../../Components/Comment/Comment'
import banner from '../../Assets/banner.jpg'
import './Transaction.css'
import {useParams} from 'react-router-dom'

const Transaction = () => {
    const {status} = useParams();

    const trans = () => {
        if(status==="process"){
            return <MainTransactionDemo />;
        }else{
            return <MainTransaction />;
        }
    }
    return (
        <div className="service__main">
            <Navbar />
            <SmallBanner bannerImg={banner} />
            <TransactionHero />
            {trans()}
            <Comment />
            <Footer />
        </div>
    )
}

export default Transaction
