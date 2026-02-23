import React, { useState, useEffect } from 'react';
import dataProducts from '../../../../../products.json';

const RandomProduct = ({ product }) => {
  return (
    <div className="product">
      <div className="image">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="info">
        <div className="name">{product.name}</div>
        <div className="price">
          <div className="current-price">${product.price}</div>
          {product.oldPrice && <div className="old-price">${product.oldPrice}</div>}
        </div>
      </div>
    </div>
  )
}

const getRandomProducts = (products, count) => {
    const newProducts = [...products]
    const randProducts = []

    for (let i = 0; i < count && newProducts.length > 0; i++) {
      const randomNumber = Math.floor(Math.random() * newProducts.length)
      randProducts.push(newProducts.splice(randomNumber, 1)[0])
    }

    return randProducts
}

const RandomProductList = () => {
  const [randomProducts, setRandomProducts] = useState([])

  useEffect(() => {
    const generatedProducts = getRandomProducts(dataProducts.products, 3)
    setRandomProducts(generatedProducts)
  }, [])

  return (
    <div className="reviewed-products js-reviewed-products">
      {randomProducts.map((product) => (
        <RandomProduct key={product.id} product={product} />
      ))}
    </div>
  )
}

export default RandomProductList;