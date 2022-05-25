import React, { useEffect, useContext, useState } from 'react';
import { defaultCredentials } from '../constant';

const AuthContext = React.createContext();

const useAuth = () => useContext(AuthContext);

function AuthProvider({children}) {
    const [isAuth, setAuth] = useState(false);
    const [credential, setCredential] = useState(defaultCredentials);
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const localStorageToken = localStorage.getItem("token");

    function setLocalToken() {
        if(localStorageToken) {
            setToken(localStorageToken);
            setAuth(true);
        }
    }
    
    useEffect(() => {
        setLocalToken();
    }, []);

    return(
        <AuthContext.Provider value={{isAuth, credential, error, token, localStorageToken, setAuth, setCredential, setError, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, useAuth};