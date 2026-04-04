import React from 'react';
import "../../shop.css"
import '../../../../App.css';



function SortCount({ productCount, onSortChange, sortOrder }) {
    const handleSortChange = (event) => {
        onSortChange(event.target.value) 
    }

    return (
        <div className="sort-and-count">
            <div className="products-count">There are <span id="js-products-count" className="bold">{productCount}</span> products in this category</div>
            <div className="sort">
                <select className="input" id="sort" value={sortOrder} onChange={handleSortChange}> 
                    <option value="">Relevance</option>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
            </div>
        </div>
    )
}

export default SortCount;




