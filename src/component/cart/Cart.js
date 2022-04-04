import { useProduct } from '../../provider/ProductProvider';
import Navbar from '../Navbar';
import CartItem from './CartItem';
import { useAuth } from '../../provider/AuthProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartDetails from './CartDetails';
import NoItems from '../NoItems';

function Cart() {
    const { cart } = useProduct();
    const { isAuth, localStorageToken } = useAuth();
    const navigate = useNavigate();

    const IsCartEmpty = cart.length ? false : true;

    //check authorization on route-navigation
    useEffect(() => {
        (!isAuth && !localStorageToken) && navigate("/login");
    },[]);
      
    return(
        <div>
            <Navbar/>
            <div className="main-content">
                <div className="cart">
                    <div className="cart-header">My Cart</div>
                    <div className="cart-content">
                        {
                            cart && cart.map((item, index) => {
                                return (
                                    <CartItem product={item} key={index}/>
                                )
                            })
                        }
                        {
                            !IsCartEmpty ? <CartDetails/> : <NoItems/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;