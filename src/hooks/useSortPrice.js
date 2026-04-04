import { useState } from 'react';

const usePriceFilter = () => {
  const [priceRange, setPriceRange] = useState({ minPrice: '', maxPrice: '' })

  const handlePriceChange = (e) => {
    const { id, value } = e.target
    setPriceRange(prevRange => ({
        ...prevRange,
        [id.replace('-price', '') + 'Price']: value
    }))
}

  return { priceRange, handlePriceChange }
}

export default usePriceFilter;