import React from 'react';
import useCategoryFilter from '../../../../hooks/useSortCategory';
import useSortColors from '../../../../hooks/useSortColors';
import RandomProductList from './CreateRandomProducts';
import "../../shop.css"
import '../../../../App.css';


const Sidebar = ({searchValue, handleSearchChange, onCategoryChange, priceRange, handlePriceChange, onColorsChange, selectedColors, isButtonDisabled, handleApplyFilter,}) => { 

    const categories = ['All', 'Men', 'Women', 'Accessories', 'New Arrivals']
    const colors = ['Black', 'Blue', 'Red', 'Brown', 'White']
    const { activeCategory, handleCategoryClick } = useCategoryFilter(categories, onCategoryChange) 
    const { handleColorChange } = useSortColors()

    const handleChange = (event) => {
        handleSearchChange(event.target.value)
    }

    const handleCheckboxChange = (color) => {
        handleColorChange(color);
        const newColors = selectedColors.includes(color)
            ? selectedColors.filter((c) => c !== color)
            : [...selectedColors, color]

        onColorsChange(newColors)
    }

    const handleCategoryClickWrapper = (category) => {
        handleCategoryClick(category)
    }

    const handlePriceChangeWrapper = (e) => {
        handlePriceChange(e)
    }


    return (
        <div className="sidebar">
            <div className="search">
                <label>
                    <input type="text" placeholder="Search" className="input search-row" id="js-search-row" value={searchValue} onChange={handleChange}/>
                    <img src= "icons/search.svg" alt="search-icon" className="search-icon" />
                </label>
            </div>
            <div className="sidebar-item">
                <div className="sidebar-title">Categories</div>
                <div className="sidebar-content">
                    <ul className="custom-list">
                        {categories.map((category) => (
                        <li key={category} className={`item js-category ${activeCategory === category ? 'active' : ''}`} data-category={category} onClick={() => handleCategoryClickWrapper(category)}>
                            {category}
                        </li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className="sidebar-item">
                <div className="sidebar-title">Price</div>
                <div className="sidebar-content">
                    <div className="price-bar">
                        <input type="number" className="input" id="min-price" placeholder="1" value={priceRange.minPrice} onChange={handlePriceChangeWrapper}/> 
                        <input type="number" className="input" id="max-price" placeholder="210.99"value={priceRange.maxPrice} onChange={handlePriceChangeWrapper}/> 
                    </div>
                </div>
            </div>

            <div className="sidebar-item">
                <div className="sidebar-title">Colors</div>
                <div className="sidebar-content">
                    <div className="colors">
                        {colors.map((color) => (
                        <div className="color" key={color}>
                            <input type="checkbox" className="color-checkbox" id={color} data-color={color} name={color} value={color} checked={selectedColors.includes(color)} onChange={() => handleCheckboxChange(color)}/>
                            <label htmlFor={color} className="color-name">
                            {color}
                            </label>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sidebar-item">
                <div className="button-wrapper">
                    <button className="button" id="apply-filter" disabled={isButtonDisabled} onClick = {handleApplyFilter}> 
                        Apply Filter
                    </button>
                    <div className='vertical-line'></div>
                </div>
            </div>

            <div className="sidebar-item">
                <div className="sidebar-title">Reviewed by you</div>
                <div className="sidebar-content">
                    <div className="reviewed-products js-reviewed-products">
                        <RandomProductList />
                    </div>
                </div>
            </div>
            <div>
                <a href="..."> 
                    <img src="img/season-sale.svg" alt="Season Sale"></img>
                </a>
            </div>
        </div>      
    )
}

export default Sidebar;








