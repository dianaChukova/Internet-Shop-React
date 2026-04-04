import React from "react";
import "../../cart.css"
import '../../../../App.css';
 

function Order({ totalPrice, isDiscountApplied, deliveryPrice }) {
    return (
        <div className="order">
            <div className="title">Your Order</div>
            <div className="order-price-wrapper">
                <div className="price-row">
                    <div className="name">Order price</div>
                    <div className="price js-order-price">${totalPrice.toFixed(2)}</div>
                </div>
                <div className="price-row">
                    <div className="name">Discount for promo code</div>
                    <div className="availability-promo-code">
                    {isDiscountApplied ? "Yes" : "No"}
                    </div>
                </div>
                <div className="price-row delimiter">
                    <div className="name">Delivery <span className="additional">(Aug 02 at 16:00)</span></div>
                    <div className="price js-delivery-price">${deliveryPrice}</div>
                </div>
                <div className="price-row total"> 
                    <div className="name">Total</div>
                    <div className="price js-total-price">${(totalPrice + deliveryPrice).toFixed(2)}</div>
                </div>
            </div>
            <div className="button-wrapper">
                <button className="button" id="checkout-button">Checkout</button>
                <div className="vertical-line"></div>
            </div>
        </div>
    )
}

export default Order
