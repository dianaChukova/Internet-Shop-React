import React from 'react';
import { useState, useEffect } from 'react';
import { getFromLs, toggleFavorite, addToBasket, removeFromBasket } from '../../../utils/ls.js';
import {PRODUCT_IN_BASKET_KEY, FAVORITES_KEY} from '../../../constants';

function Product({ product }) {
  const favoritesIcon = '/icons/favorites.svg'
  const redFavoritesIcon = '/icons/redFavorites.svg'

  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = getFromLs(FAVORITES_KEY) || []
    return favorites.includes(product.id)
  })

  const [isAdded, setIsAdded] = useState(() => {
    const productsInBasket = getFromLs(PRODUCT_IN_BASKET_KEY) || []
    return productsInBasket.some(item => item.id === product.id)
  })

  useEffect(() => {
    const favorites = getFromLs(FAVORITES_KEY) || []
    setIsFavorite(favorites.includes(product.id))
  }, [product.id])

  const handleFavoriteClick = () => {
    toggleFavorite(product, FAVORITES_KEY, !isFavorite)
    setIsFavorite(!isFavorite)
  }

  const buyButtonClickHandler = () => {
    if (isAdded) {
        removeFromBasket(product.id)
        setIsAdded(false)
    } else {
        addToBasket(product)
        setIsAdded(true)
    }
  }

  return (
    <div className="product">
      <div className="photo">
        <div className="top-bar">
          <div className="labels">
            {product.isSale && <div className="label sale">Sale</div>}
            {product.isNew && <div className="label new">New</div>}
          </div>
          <div className="favorites" onClick={handleFavoriteClick}>
            <img
              src={isFavorite ? redFavoritesIcon : favoritesIcon}
              alt={isFavorite ? "Active Favorite Icon" : "Favorite Icon"}
            />
          </div>
        </div>
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="info">
        <div className="name">{product.name}</div>
        <div className="price">
          <div className="current-price">${product.price}</div>
          {product.oldPrice && <div className="old-price">${product.oldPrice}</div>}
        </div>
      </div>
      <button
        className="buyButton"
        id={`buy-button-${product.id}`}
        onClick={buyButtonClickHandler} 
        disabled={isAdded}
      >
        {isAdded ? "Добавлено в корзину" : "Купить"}
      </button>
    </div>
  );
}

export default Product;



