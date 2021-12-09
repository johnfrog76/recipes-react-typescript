import React, { FC, createContext, useState } from 'react';

import { iUser } from '../../interfaces/user/user.interface';

type UserContextType = {
    user: iUser | null;
    isLoggedIn: boolean,
    token: string | null;
    setLogin: (val: boolean) => void;
    setUserToken: (val: any) => void;
    setUserObject: (val: any) => void;
}

export const AuthContext = createContext<UserContextType>({
    user: null,
    isLoggedIn: false,
    token: null,
    setLogin: () => { },
    setUserToken: (val) => { },
    setUserObject: (val) => { }
});

interface Props {
    children?: React.ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
    const [user, setUser] = useState<iUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState(null);
    const setLogin = (val = false) => setIsLoggedIn(val);
    const setUserToken = (val = null) => setToken(val);
    const setUserObject = (val = null) => setUser(val);

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            token,
            setLogin,
            setUserToken,
            setUserObject
        }}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;