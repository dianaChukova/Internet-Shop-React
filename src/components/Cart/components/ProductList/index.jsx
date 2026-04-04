import React from "react";
import { useState, useEffect} from "react";
import { getFromLs, removeFromBasket, updateQuantity } from "../../../../utils/ls.js";
import { PRODUCT_IN_BASKET_KEY } from "../../../../constants"
import "../../cart.css"
import '../../../../App.css';


function CreateProductsFromLS() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const handleBasketUpdate = () => {
            const storedProducts = getFromLs(PRODUCT_IN_BASKET_KEY)
            if (storedProducts) {
                setProducts(storedProducts)
            } else {
                setProducts([])
            }
        }

        handleBasketUpdate()
        window.addEventListener('basketUpdated', handleBasketUpdate)

        return () => {
            window.removeEventListener('basketUpdated', handleBasketUpdate)
        }
    }, [])

    const handleUpdateQuantity = (productId, amount) => {
        updateQuantity(productId, amount)
    }

    const handleRemoveFromBasket = (productId) => {
        removeFromBasket(productId)
    }

  const createProduct = (product) => {
    return (
      <div className="product" data-product-id={product.id} key={product.id}>
        <div className="photo">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        <div className="product-info">
          <div className="title">{product.name}</div>

          <div className="price-wrapper">
            <div className="price-and-quantity">
              <div className="price">
                <div className="current-price">${product.price?.toFixed(2)}</div>
                {product.oldPrice && (
                  <div className="old-price">${product.oldPrice?.toFixed(2)}</div>
                )}
              </div>

              <div className="quantity">
                <div className="count-button" onClick={() => handleUpdateQuantity(product.id, -1)}> 
                  -
                </div>
                <div className="count">{product.quantity || 1}</div>
                <div className="count-button" onClick={() => handleUpdateQuantity(product.id, 1)}> 
                  +
                </div>
              </div>
            </div>
          </div>

          <div className="close" onClick={() => handleRemoveFromBasket(product.id)}> 
            X
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => createProduct(product)) 
      ) : (
        <div>В корзине пока нет товаров.</div>
      )}
    </div>
  )
}

export default CreateProductsFromLS

