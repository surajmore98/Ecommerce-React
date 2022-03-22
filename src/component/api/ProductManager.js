import axios from "axios";

async function getProduct(id) {
    try
    {
        return await axios.get(`/api/products/${id}`);
    } 
    catch(e)
    {
        console.error(e);
        throw e;
    }
}

async function getProducts() {
    try
    {
        return await axios.get("/api/products");;
    }
    catch(e)
    {
        console.error(e);
        throw e;
    }
}

export { getProduct , getProducts };