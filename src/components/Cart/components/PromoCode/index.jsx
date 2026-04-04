import React from "react";
import { useState, useCallback } from "react";
import "../../cart.css"
import '../../../../App.css';
 

function PromoCode({ onApplyPromoCode }) {  
    const [promoCodeValue, setPromoCodeValue] = useState('')

    const handlePromoCodeChange = useCallback((event) => {
        setPromoCodeValue(event.target.value)
    }, [])

    const handleApplyClick = () => {
        onApplyPromoCode(promoCodeValue)
    }

    return (
        <div className="promo-code-wrapper">
            <div className="info">
                <div className="title">You Have A Promo Code?</div>
                <div className="description">To receive up-to-date promotional codes, subscribe to us on social networks.</div>
            </div>
            <div className="promo-code">
                <input type="text" name="promo-code" className="input input-promo-code " placeholder="Enter promo code" value={promoCodeValue} onChange={handlePromoCodeChange}/>
                <div className="button-wrapper">
                    <button className="button button-promo-code" onClick={handleApplyClick}>
                        <img src="icons/promo-code-arrow.svg" alt="arrow icon"/>
                    </button>
                    <div className="vertical-line"></div>
                </div>
            </div>
            <div className="find-us">
                <div className="find-us-text">Find us here:</div>
                <div className="find-us-links">
                    <div className="find-us-link">
                        <a href="/">FB</a>
                    </div>
                    <div className="line"></div>
                    <div className="find-us-link">
                        <a href="/">TW</a>
                    </div>
                    <div className="line"></div>
                    <div className="find-us-link">
                        <a href="/">INS</a>
                    </div>
                    <div className="line"></div>
                    <div className="find-us-link">
                        <a href="/">PT</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromoCode

