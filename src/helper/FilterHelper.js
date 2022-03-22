import { highToLow, lowToHigh } from "../constant";

function getSortProducts(productData, type) {
  if (productData && productData.length && type) {
    switch (type) {
      case highToLow:
        return [...productData].sort((x, y) => y.price - x.price);
      case lowToHigh:
        return [...productData].sort((x, y) => x.price - y.price);
      default:
        return productData;
    }
  }
  return data;
}

function getFilteredProductsByProperty(productData, value, property) {
  if (productData && productData.length) {
    if (value) {
      return typeof(value) != 'number' ? productData.filter((x) => x[property].toLocaleLowerCase() === value.toLocaleLowerCase()) :
                productData.filter((x) => x[property] <= value);
    }
  }
  return productData;
}  

function getFilteredProducts(products, price, brand, gender, rating) {
  if(products && products.length > 0) {
    if(price) {
      products = getSortProducts(products, price);
    }

    if(brand) {
      products = getFilteredProductsByProperty(products, brand, "brand");
    }

    if(gender) {
      products = getFilteredProductsByProperty(products, gender, "gender");
    }

    if(rating) {
      products = getFilteredProductsByProperty(products, rating, "rating");
    }
  }

  return products;
}

export  {  getFilteredProducts };