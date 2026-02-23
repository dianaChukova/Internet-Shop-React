import React from 'react';
import Product from "./Product.jsx";
import "../shop.css"
import '../../../App.css';


function ProductList({ products }) { 
  return (
    <div className="js-products products">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList;




