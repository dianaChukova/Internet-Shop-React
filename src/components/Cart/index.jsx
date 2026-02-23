import React from "react";
import { useState,useEffect,useCallback } from "react";
import Header from "../Header";
import HeaderContent from '../Header/HeaderContent';
import Footer from "../Footer";
import Order from "./components/Order";
import CreateProductsFromLS from "./components/ProductList";
import PromoCode from "./components/PromoCode";
import { getFromLs } from "../../utils/ls.js";
import { PRODUCT_IN_BASKET_KEY } from "../../constants"
import "./cart.css"
import '../../App.css';


const DELIVERY_PRICE = 16
const DISCOUNT_RATE = 0.5


function CartApp() {
    const [totalPrice, setTotalPrice] = useState(0)
    const [promoCode, setPromoCode] = useState("")
    const [isDiscountApplied, setIsDiscountApplied] = useState(false)
    const [initialTotalPrice, setInitialTotalPrice] = useState(0)

    const handleBasketUpdate = useCallback(() => {
        const storedProducts = getFromLs(PRODUCT_IN_BASKET_KEY)
        let newInitialTotalPrice = 0

        if (storedProducts) {
            storedProducts.forEach((product) => {
                newInitialTotalPrice += product.price * (product.quantity || 1)
            })
        }

        if (newInitialTotalPrice === 0) {
            setPromoCode("")
            setIsDiscountApplied(false)
        }

        setInitialTotalPrice(newInitialTotalPrice)
        if (!isDiscountApplied) {
            setTotalPrice(newInitialTotalPrice)
        } else {
             setTotalPrice(newInitialTotalPrice * DISCOUNT_RATE)
        }

    }, [isDiscountApplied])

    useEffect(() => {
        handleBasketUpdate()
        window.addEventListener('basketUpdated', handleBasketUpdate)

        return () => {
            window.removeEventListener('basketUpdated', handleBasketUpdate)
        }
    }, [handleBasketUpdate])


    const handleApplyPromoCode = (promo) => {
        setPromoCode(promo)
        setIsDiscountApplied(true)
    }
    
    return (
        <div>
            <header>
                <Header />
                <HeaderContent title="Cart" worldCart="Cart" activeWord= "word2" />
            </header>
            <div className='container'>
                <div className='cart'>
                    <div className="order-wrapper">
                        <CreateProductsFromLS/>
                        <Order
                            totalPrice={totalPrice}
                            isDiscountApplied={isDiscountApplied}
                            deliveryPrice={DELIVERY_PRICE}
                         />
                    </div>
                    <PromoCode onApplyPromoCode={handleApplyPromoCode} />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

    
export default CartApp;



