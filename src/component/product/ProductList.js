import { useProduct } from '../../provider/ProductProvider';
import Product from './Product';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Filter from './Filter';
import { getFilteredProducts } from '../../helper/FilterHelper';
import { getProducts } from '../api/ProductManager';
import Navbar from '../Navbar';

function ProductList() {
    const { products, setProducts, filter } = useProduct();
    const { type } = useParams();
    const { price, gender, brand, rating } = filter;
    
    let productList = intitalise(products, type);
    productList = getFilteredProducts(productList, price, brand, gender, rating);
    const productCount = productList.length > 0 ? true : false;

    function intitalise(products, param) {
        if(param && products && products.length) {
            products = products.filter(p => p.brand === param || p.gender === param);
        }
        return products;
    }
    
    async function getproductsData() {
        const data = await getProducts();
        setProducts(data.data.products);
    }
    
    useEffect(() => {
        (async () => {
            await getproductsData();
          })();
    }, []);

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