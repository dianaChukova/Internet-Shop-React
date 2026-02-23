import { useState, useEffect } from 'react';

/* 
 • @param {Array} initialCategories 
 • @param {Function} onCategoryChange
 • @returns {Object} 
*/
 
const useCategoryFilter = (initialCategories, onCategoryChange) => {
    const [activeCategory, setActiveCategory] = useState(null)

    useEffect(() => {
        if (!activeCategory && initialCategories.length > 0) {
            setActiveCategory(initialCategories[0])
            onCategoryChange(initialCategories[0])
        }
    }, [initialCategories, activeCategory, onCategoryChange])

    const handleCategoryClick = (category) => {
        if (activeCategory === category) {
            setActiveCategory(null)
            onCategoryChange(null) 
        } else {
            setActiveCategory(category)
            onCategoryChange(category)
        }
    }

    return {
        activeCategory,
        handleCategoryClick,
    }
}

export default useCategoryFilter;