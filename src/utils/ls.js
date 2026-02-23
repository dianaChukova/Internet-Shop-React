import { PRODUCT_IN_BASKET_KEY } from '../constants'

export const getFromLs = (key) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  } catch (error) {
    console.error(`Ошибка при чтении из localStorage: ${key}`, error)
    return null
  }
}

export const setToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const toggleFavorite = (product, key, isAdding) => {
  let favorites = getFromLs(key) || []

  if (isAdding) {
    if (!favorites.includes(product.id)) {
      favorites.push(product.id)
    }
  } else {
    favorites = favorites.filter(id => id !== product.id)
  }

  localStorage.setItem(key, JSON.stringify(favorites))
  window.dispatchEvent(new Event('storage'))
}

export const addToBasket = (product) => {
  const existingProducts = getFromLs(PRODUCT_IN_BASKET_KEY) || []
  const updatedProducts = [...existingProducts, product]
  localStorage.setItem(PRODUCT_IN_BASKET_KEY, JSON.stringify(updatedProducts))
 
  window.dispatchEvent(new CustomEvent('basketUpdated'))
}

export const removeFromBasket = (productId) => {
    const existingProducts = getFromLs(PRODUCT_IN_BASKET_KEY) || []
    const updatedProducts = existingProducts.filter(product => product.id !== productId)
    localStorage.setItem(PRODUCT_IN_BASKET_KEY, JSON.stringify(updatedProducts))

    window.dispatchEvent(new CustomEvent('basketUpdated'))
}


export const updateQuantity = (productId, amount) => {
  const existingProducts = getFromLs(PRODUCT_IN_BASKET_KEY) || []

  const updatedProducts = existingProducts.map(product => {
    if (product.id === productId) {
      const newQuantity = Math.max(1, (product.quantity || 1) + amount)
      return { ...product, quantity: newQuantity }
    }
    return product
  })

  localStorage.setItem(PRODUCT_IN_BASKET_KEY, JSON.stringify(updatedProducts))

  window.dispatchEvent(new CustomEvent('basketUpdated'))

}

