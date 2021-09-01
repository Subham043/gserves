import React from 'react';
import './TransactionHero.css';
import { Container } from 'react-bootstrap';

const TransactionHero = (props) => {

    return (
        <div className="service__form__hero__outer__div">
            <Container>
                <div className="service__form__hero__inner__div">

                    <div className="description__div">

                        <div className="heading">
                            <p>MY TRANSACTIONS</p>
                        </div>

                        
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default TransactionHero
