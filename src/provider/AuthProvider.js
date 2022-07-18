import React, { useEffect, useContext, useState } from 'react';
import { defaultCredentials } from '../constant';

const AuthContext = React.createContext();

const useAuth = () => useContext(AuthContext);

function AuthProvider({children}) {
    const [isAuth, setAuth] = useState(false);
    const [credential, setCredential] = useState(defaultCredentials);
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [user, setUser] = useState({ });

    const localStorageToken = localStorage.getItem("token");
    const localStorageUser = localStorage.getItem("user");

    function setLocalToken() {
        if(localStorageToken) {
            setToken(localStorageToken);
            setAuth(true);
        }
    }

    function setLocalUser() {
        if(localStorageUser) {
            setToken(JSON.parse(localStorageUser));
            setAuth(true);
        }
    }
    
    useEffect(() => {
        setLocalToken();
        setLocalUser();
    }, []);

    return(
        <AuthContext.Provider value={{isAuth, credential, error, token, localStorageToken,
            user, setUser, setAuth, setCredential, setError, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, useAuth};