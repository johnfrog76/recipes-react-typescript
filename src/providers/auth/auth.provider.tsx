import React, { FC, createContext, useState, useEffect } from 'react';

import { iUser } from '../../interfaces/user/user.interface';
import { setUserAuth, getUserAuth, StoredAuthType, expireAuth } from './auth.utilities';

type UserContextType = {
    user: iUser | null;
    isLoggedIn: boolean,
    token: string | null;
    setLogin: (val: boolean) => void;
    setUserToken: (val: any) => void;
    setUserObject: (val: any) => void;
    setUserExpiration: (val: any) => void;
    expiration: number | null;
    setUserAuth: (user: iUser, expires: number) => void;
    getUserAuth: () => void;
    expireAuth: () => void;
}

export const AuthContext = createContext<UserContextType>({
    user: null,
    isLoggedIn: false,
    token: null,
    setLogin: () => { },
    setUserToken: (val) => { },
    setUserObject: (val) => { },
    expiration: null,
    setUserExpiration: (val) => { },
    setUserAuth: () => { },
    getUserAuth: () => { },
    expireAuth: () => { }
});

interface Props {
    children?: React.ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {

    const [user, setUser] = useState<iUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [expiration, setExpiration] = useState<number | null>(null);
    const setLogin = (val = false) => setIsLoggedIn(val);
    const setUserToken = (val = null) => setToken(val);
    const setUserObject = (val = null) => setUser(val);
    const setUserExpiration = (val = null) => setExpiration(val);

    useEffect(() => {
        expireAuth();
        const storageUser = getUserAuth();

        if (storageUser) {
            setUser(storageUser.user);
            setIsLoggedIn(true);
            setToken(storageUser.user.token);
            setExpiration(storageUser.expires);
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            token,
            expiration,
            setLogin,
            setUserToken,
            setUserObject,
            setUserExpiration,
            setUserAuth,
            getUserAuth,
            expireAuth
        }}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;