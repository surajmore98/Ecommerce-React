import axios from "axios";
import { useAuth } from "../../provider/AuthProvider";

async function getWishlistItems(token) {
    try {
        return await axios.get('/api/user/wishlist', {
            headers: {
                authorization: token
            }
        });
    } catch(e) {
        console.error(e);
    }
}

async function addItemToWishlist(product, token) {
    try {
        return await axios.post('/api/user/wishlist', {
            "product": product
        }, {
            headers: {
                authorization: token
            }
        });
    } catch(e) {
        console.error(e);
    }
}

async function updateWishlistItem({id, actionType}, token) {
    try {
        return await axios.put(`/api/user/wishlist/${id}`, actionType, {
            headers: {
                authorization: token
            }
        });
    } catch(e) {
        console.error(e);
    }
}

async function removeItemFromWishlist(id, token) {
    try {
        return await axios.delete(`/api/user/wishlist/${id}`, {
            headers: {
                authorization: token
            }
        });
    } catch(e) {
        console.error(e);
    }
}


export { getWishlistItems, addItemToWishlist, updateWishlistItem, removeItemFromWishlist}