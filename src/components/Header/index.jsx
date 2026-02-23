import React from 'react';
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getFromLs } from '../../utils/ls';
import { PRODUCT_IN_BASKET_KEY, FAVORITES_KEY } from '../../constants'
import './header.css'; 


 function Header() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const [favoriteCount, setFavoriteCount] = useState(0)
  const [basketCount, setBasketCount] = useState(0)

  useEffect(() => {
    updateHeaderFavoriteInfo()
    updateHeaderBasketInfo()
  }, [])

  const handleBurgerClick = () => {
    setIsBurgerOpen(!isBurgerOpen)
  }

  const updateHeaderFavoriteInfo = () => {
    const productsInFavorite = getFromLs(FAVORITES_KEY) || []
    setFavoriteCount(productsInFavorite.length)
  }

  const updateHeaderBasketInfo = () => {
    const productsInBasket = getFromLs(PRODUCT_IN_BASKET_KEY) || []
    setBasketCount(productsInBasket.length)
  }

  useEffect(() => {
    const handleStorageChange = () => {
      updateHeaderFavoriteInfo();
    };

    const handleBasketUpdate = () => {
      updateHeaderBasketInfo();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('basketUpdated', handleBasketUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('basketUpdated', handleBasketUpdate);
    };
  }, []);

  return (
    <header className="header">
    <div className="left">
      <div className="logo-container">
        <div className="burger-menu">
          <input type="checkbox" id="burger-checkbox" className="burger-checkbox"  checked={isBurgerOpen}  onChange={handleBurgerClick} />
          <label className="burger" htmlFor="burger-checkbox"></label>
        </div>
        <div className="logo">
          <img src="icons/logo.svg" alt="logo" />
        </div>
      </div>
      <div className="menu">
        <div className="menu-item">
          <span>Home</span>
        </div>
        <div className="menu-item">
          <span>Pages</span>
          <img src="icons/arrow.svg" className="arrow-default" alt="arrow" />
          <img src="icons/arrow-red.svg" className="arrow-hover" alt="arrow" />
        </div>
        <div className="menu-item active">
          <span>Shop</span>
          <img src="icons/arrow.svg" className="arrow-default" alt="arrow" />
          <img src="icons/arrow-red.svg" className="arrow-hover" alt="arrow" />
        </div>
        <div className="menu-item">
          <span>Blog</span>
        </div>
        <div className="menu-item">
          <span>Contact</span>
        </div>
      </div>
    </div>
    <div className="right">
      <div className="header-icon">
        <img src="icons/search.svg" alt="search" />
      </div>
      <div className="header-icon">
        <img src="icons/profile.svg" alt="profile" />
      </div>
      <Link className="header-icon">
        <img src="icons/favorites.svg" alt="favorites" />
        <div className="counter" id="js-favorite-counter">{favoriteCount}</div>
      </Link>
      <div className="header-icon">
        <Link to="/cart">
          <img src="icons/cart.svg" alt="Переход в корзину" />
        </Link>
        <Link>
          <div className="counter js-basket-counter">{basketCount}</div>
        </Link>
      </div>
    </div>
  </header>
  )
}

export default Header;