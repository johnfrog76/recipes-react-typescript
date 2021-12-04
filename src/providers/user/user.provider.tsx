import React, { FC, createContext, useState, useEffect } from 'react';

import { iUser } from '../../interfaces/user/user.interface';

type UserContextType = {
    user: iUser | null;
    isLoggedIn: boolean,
    token: string | null;
    setLogin: (val: boolean) => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    isLoggedIn: false,
    token: null,
    setLogin: () => { }
});

interface Props {
    children?: React.ReactNode;
}

const UserProvider: FC<Props> = ({ children }) => {
    const [user, setUser] = useState<iUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const setLogin = (val = false) => setIsLoggedIn(val);

    return (
        <UserContext.Provider value={{
            user,
            isLoggedIn,
            token,
            setLogin
        }}>{children}</UserContext.Provider>
    )
}

export default UserProvider;