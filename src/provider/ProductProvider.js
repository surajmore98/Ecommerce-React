import { filterByGender, sortByPrice, filterByBrand, filterByRating, clearFilter } from '../constant';
import React, { useContext, useState, useReducer, useEffect } from 'react';

const ProductContext = React.createContext();

const useProduct = () => useContext(ProductContext);

function useFilter() {
    let initialfilter = {
        price: "",
        gender: "",
        brand: "",
        rating: 5
    };

    return useReducer(
        function reduceFunction(filter, action) {
          switch (action.type) {
            case sortByPrice:
              return { ...filter, price: action.payload };
            case filterByGender:
              return { ...filter, gender: action.payload };
            case filterByBrand:
              return { ...filter, brand: action.payload };
            case filterByRating:
              return { ...filter, rating: action.payload };
            case clearFilter:
              return { ...initialfilter };
            default:
              return filter;
          }
        },
        initialfilter
    );
}

function ProductProvider({children}) {
    const [wishList, setWishList] = useState([]);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [filter, dispatch] = useFilter();

    return(
        <ProductContext.Provider value={{cart, wishList, products, setWishList, setCart, setProducts, filter, dispatch}}>
            {children}
        </ProductContext.Provider>
    );
}

export {ProductProvider, useProduct};