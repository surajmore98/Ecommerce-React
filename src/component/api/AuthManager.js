import axios from "axios";

async function login({email, password}) {
    try
    {
        const result =  await axios.post("api/auth/login", {
            email: email,
            password: password
        });

        return result;
    } catch(e) {
        console.error(e);
        throw e;
    }
}

async function register({email, password, firstName, lastName}) {
    try
    {
        const result =  await axios.post("api/auth/signup", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });

        return result;
    } catch(e) {
        console.error(e);
        throw e;
    }
}


export { login, register };