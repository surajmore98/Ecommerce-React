import React, { useEffect, useContext, useState } from 'react';

const AuthContext = React.createContext();

const useAuth = () => useContext(AuthContext);

function AuthProvider({children}) {
    const [isAuth, setAuth] = useState(false);
    const [credential, setCredential] = useState({email: undefined, password: undefined, firstName: undefined, lastName: undefined});
    const [error, setError] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            setToken(token);
            setAuth(true);
        }
    }, []);

    return(
        <AuthContext.Provider value={{isAuth, credential, error, token, setAuth, setCredential, setError, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, useAuth};