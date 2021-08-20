import { createContext } from 'react';

const AuthContext = createContext({
    auth: undefined,    //dataUser
    login: () => null,   //saveToken
    logout: () => null,
    setReloadUser: () => null   // reloadApp
});

export default AuthContext;