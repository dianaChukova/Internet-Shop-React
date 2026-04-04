import React from 'react';
import { useState,  useEffect, useCallback, useMemo } from 'react';
import { sortByName } from '../../utils/sortByName.js'; 
import HeaderContent from '../Header/HeaderContent';
import Header from '../Header';
import Sidebar from './ComponentsShop/Sidebar';
import SortCount from './ComponentsShop/SortAndCount';
import Footer from '../Footer';
import Newsletter from './ComponentsShop/Newsletter';
import dataProducts from '../../products.json'; 
import Pagination from '../Pagination';
import usePagination from '../../hooks/usePagination.js';
import ProductList from './components/ProductList.jsx';
import useSortSearchRow from '../../hooks/useSortSearchRow.js'; 
import usePriceFilter from '../../hooks/useSortPrice.js';
import useApplyFilterButton from '../../hooks/useApplyFilterButton.js';
import "./shop.css"
import "../../App.css";



function ShopApp() {
    const initialProducts = useMemo(() => dataProducts.products || [], [])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const { priceRange, handlePriceChange } = usePriceFilter()
    const [selectedColors, setSelectedColors] = useState([])
    const [products, setProducts] = useState(initialProducts)
    const [productCount, setProductCount] = useState(initialProducts.length)
    const itemsPerPage = 12

    const {
        searchValue,
        handleSearchChange,
        filteredProducts: searchAndSortFilteredProducts,
        sortOrder,
        handleSortChange,
    } = useSortSearchRow(initialProducts, sortByName)

    const { isButtonDisabled, updateCurrentFilter, handleApplyFilter } = useApplyFilterButton()

    const [categoryPriceColorFilteredProducts, setCategoryPriceColorFilteredProducts] = useState(searchAndSortFilteredProducts)
    
    const handleColorsChange = useCallback((colors) => {
        setSelectedColors(colors)
    }, [])

    const handleCategoryChange = (category) => {
        setSelectedCategory(category)
    }

    const getFilteredProducts = useCallback((productsToFilter) => {
        let categoryFiltered = productsToFilter 
 
        if (selectedCategory !== 'All') {
            categoryFiltered = productsToFilter.filter(product => product.categories.includes(selectedCategory))
        }
 
        let priceFiltered = categoryFiltered
 
        if (priceRange.minPrice !== '') {
            priceFiltered = priceFiltered.filter(product => product.price >= parseFloat(priceRange.minPrice)) 
        }
 
        if (priceRange.maxPrice !== '') {
            priceFiltered = priceFiltered.filter(product => product.price <= parseFloat(priceRange.maxPrice)) 
        }

        let colorFiltered = priceFiltered

        if (selectedColors.length > 0)  {
            colorFiltered = priceFiltered.filter(product => selectedColors.some(color => product.color && product.color.includes(color)))
        }
 
        return colorFiltered 
    }, [selectedCategory, priceRange, selectedColors] )


     useEffect(() => {
        setProducts(searchAndSortFilteredProducts)
        setProductCount(searchAndSortFilteredProducts.length)
    }, [searchAndSortFilteredProducts])

    const handleApplyFilterClick = () => {
        const filteredProducts = getFilteredProducts(searchAndSortFilteredProducts)

        setProducts(filteredProducts)
        setProductCount(filteredProducts.length)
        handleApplyFilter()
        setCategoryPriceColorFilteredProducts(filteredProducts)
    }

    useEffect(() => {
        updateCurrentFilter({ selectedCategory, priceRange, selectedColors})
    }, [selectedCategory, priceRange, selectedColors, updateCurrentFilter])
    
        const {
            activePage,
            pageCount,
            getPaginatedItems,
            handlePageChange,
            handleNextPage,
            handlePrevPage,
            isFirstPage,
            isLastPage,
        } = usePagination(itemsPerPage, products.length);
    
        const paginatedProducts = getPaginatedItems(products);

  return (
    <div>
        <header>
            <Header />
            <HeaderContent title="Shop" worldCart={false} activeWord = "word1"/>
        </header>
        <div className='container'>
        <div className='shop'>
            <Sidebar 
                handleApplyFilter={handleApplyFilterClick} 
                searchValue={searchValue} 
                handleSearchChange={handleSearchChange}
                sortOrder={sortOrder}
                handleSortChange={handleSortChange}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
                onColorsChange={handleColorsChange}   
                selectedColors={selectedColors}
                isButtonDisabled={isButtonDisabled}
                selectedCategory={selectedCategory}
            />
            <div className='products-wrapper'>
            <SortCount 
                productCount={products.length}
                onSortChange={handleSortChange}
                sortOrder={sortOrder}
            />
            <ProductList products={paginatedProducts} />  
            <Pagination
              items={products}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              activePage={activePage}
              pageCount={pageCount}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
            />
            </div>
        </div>
        </div>
        <Newsletter />
        <Footer/>
    </div>
  )
}

export default ShopApp;
