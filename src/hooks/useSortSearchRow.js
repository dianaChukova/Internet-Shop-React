import { useState, useCallback, useEffect } from 'react';

const useSearchRow = (initialProducts, sortByName) => {
    const [searchValue, setSearchValue] = useState('')
    const [sortOrder, setSortOrder] = useState('') 
    const [filteredProducts, setFilteredProducts] = useState(initialProducts)

    const handleSearchChange = useCallback((value) => {
        setSearchValue(value)
    }, [])

    const handleSortChange = useCallback((value) => {
        setSortOrder(value) 
    }, [])

    useEffect(() => {
        let newFilteredProducts = [...initialProducts] 

        if (sortByName && sortOrder) { 
            newFilteredProducts = sortByName(newFilteredProducts, sortOrder)
        }

        if (searchValue) {
            newFilteredProducts = newFilteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchValue.toLowerCase())
            )
        }
        
        setFilteredProducts(newFilteredProducts)
    }, [searchValue, initialProducts, sortOrder, sortByName])

    return {
        searchValue,
        handleSearchChange,
        filteredProducts,
        sortOrder,       
        handleSortChange, 
    }
}

export default useSearchRow;
