import axios from "axios";

async function getCartItems(token) {
    try {
        return await axios.get('/api/user/cart', {
            headers: {
                authorization: token
            }
        });
    } catch(e) {
        console.error(e);
    }
}

async function addItemToCart(product, token) {
    try {
        return await axios.post('/api/user/cart', {
            "product" : product
        }, {
            headers: {
                authorization: token
            }
        });
    } catch(e) {
        console.error(e);
    }
}

async function updateCartItem({id, action}, token) {
    try {
        return await axios.post(`/api/user/cart/${id}`, {
            "action": {
                "type": action
            }
        }, {
            headers: {
                authorization: token
            }
        });
    } catch(e) {
        console.error(e);
    }
}

async function removeItemFromCart(id, token) {
    try {
        return await axios.delete(`/api/user/cart/${id}`, {
            headers: {
                authorization: token
            }
        });
    } catch(e) {
        console.error(e);
    }
}


export { getCartItems, addItemToCart, updateCartItem, removeItemFromCart}