import { useProduct } from '../../provider/ProductProvider';
import Navbar from '../Navbar';
import CartItem from './CartItem';
import { getCartTotal } from '../../helper/CartHelper';
import { useAuth } from '../../provider/AuthProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartItems} from '../api/CartManager';

function Cart() {
    const { cart, setCart } = useProduct();
    const { isAuth, token } = useAuth();
    const navigate = useNavigate();
    
    //check authorization on route-navigation
    useEffect(() => {
        !isAuth && navigate("/login");
    },[]);
  
    const total = getCartTotal(cart);
    
    return(
        <div>
            <Navbar/>
            <div className="main-content">
                <div className="cart">
                    <div className="cart-header">My Cart</div>
                    <div className="cart-content">
                        {
                            cart && cart.map((item, index) => {
                                console.log(item, "item", index);
                                return (
                                    <CartItem product={item} key={index}/>
                                )
                            })
                        }

                        <div className="cart-content-right bg-white  m-sm">
                            <div className="cart-header cart-content-header">
                                PRICE DETAILS
                            </div>
                            <div className="cart-content-divider"></div>
                            <div className="cart-content-detail">
                                <div>
                                    Price({total.quantity} items)
                                </div>
                                <div>
                                    &#x20B9;{total.totalOriginalPrice}
                                </div>
                            </div>
                            <div className="cart-content-detail">
                                <div>
                                    Discount
                                </div>
                                <div>
                                    -&#x20B9;{total.discountAmount}
                                </div>
                            </div>
                            <div className="cart-content-detail">
                                <div>
                                    Delivery Charges
                                </div>
                                <div>
                                    &#x20B9;{total.deliveyCharges}
                                </div>
                            </div>
                            <div className="cart-content-divider"></div>
                            <div className="cart-header cart-content-header">
                                <div>
                                    TOTAL AMOUNT
                                </div>
                                <div>
                                    &#x20B9;{total.totalAmount}
                                </div>
                            </div>
                            <div className="cart-content-divider"></div>
                            <div className="cart-content-detail">
                                You will save &#x20B9;{total.discountAmount} on this order
                            </div>
                            <button className="btn product-btn bg-info white p-md">Proceed To Payment</button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;