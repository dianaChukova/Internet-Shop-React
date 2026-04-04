import React from 'react';
import "../../shop.css"
import '../../../../App.css';


const Newsletter = () => {

    return (
        <div className="newsletter-wrapper">
            <div className="container">
                <div className="newsletter-container">
                    <div className="vector-object-img">
                        <img src="img/vector-object5x5.svg" alt=''></img>
                    </div>
                    <div className="newsletter-title">Newsletter</div>
                    <div className="info">Be the first to hear about deals,  offers and upcoming collections.</div>
                    <div className="label">
                        <input type="email" placeholder="Enter your email" className="input"></input>
                        <div className="button-wrapper">
                            <button className="button">Subscribe</button>
                            <div className="vertical-line"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Newsletter;
