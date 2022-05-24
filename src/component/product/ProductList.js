import { useProduct } from '../../provider/ProductProvider';
import Product from './Product';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Filter from './Filter';
import { getFilteredProducts } from '../../helper/FilterHelper';
import { getProducts } from '../api/ProductManager';
import Navbar from '../Navbar';
import { clearFilter } from '../../constant';

function ProductList() {
    const { products, setProducts, filter, dispatch } = useProduct();
    const [searchParams] = useSearchParams();
    const { price, gender, brand, rating } = filter;
    const queryParams = [];

    for (const entry of searchParams.entries()) {
        queryParams.push(entry);
    }
    
    async function getproductsData() {
        const data = await getProducts();
        setProducts(data.data.products);
    }

    useEffect(() => {
        (async () => {
            dispatch({ type: clearFilter });
            await getproductsData();
            if(queryParams && queryParams.length > 0) {
                for (const arrItem of queryParams) {
                    dispatch({ type: arrItem[0].toUpperCase(), payload: arrItem[1] });
                }
            }
          })();
    }, []);

    const productList = getFilteredProducts(products, price, brand, gender, rating);
    const productCount = productList.length > 0 ? true : false;

    return (
        <div >
            <Navbar/>
            <div className="container">
            <Filter/> 
            <div className="main-content product-grid">
                { 
                    productList && productList.map((item, index) => {
                        return(
                            <Product product={item} key={index}/>
                        )
                    })
                }
            </div>
            {
                    !productCount && <h1 className="no-items">No Products To Show!</h1>
            }
        </div>
        </div>
    );
};

export default ProductList;