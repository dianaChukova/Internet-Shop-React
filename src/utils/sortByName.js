export const sortByName = (products, order) => {
  return products.sort((a, b) => {
    if (order === "asc") {
        if (a.name > b.name) return 1
        if (a.name === b.name) return 0
        if (a.name < b.name) return -1
    } 
        if (a.name > b.name) return -1
        if (a.name === b.name) return 0
        if (a.name < b.name) return 1
  })
}


