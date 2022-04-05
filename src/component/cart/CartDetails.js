import { getCartTotal } from '../../helper/CartHelper';
import { useProduct } from '../../provider/ProductProvider';

function CartDetails() {
    const { cart } = useProduct();
    const total = getCartTotal(cart);

    return (
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
    );
}

export default CartDetails;