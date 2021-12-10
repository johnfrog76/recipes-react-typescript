import React, { createContext, FC, useState } from 'react';

import USERS_LIST from './users-collection.data.json';
import { iUserItem } from '../../interfaces/users/users.interface';


type UsersContextType = {
    userItems: iUserItem[];
    isLoading: boolean;
    userCount: number;
}

export const UsersContext = createContext<UsersContextType>({
    userItems: [],
    userCount: 0,
    isLoading: true
});

interface Props {
    children?: React.ReactNode;
}

const UsersProvider: FC<Props> = ({ children }) => {
    const [userItems, setUserItems] = useState<iUserItem[]>(USERS_LIST.users);
    const [userCount, setUserCount] = useState<number>(USERS_LIST.users.length);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (<UsersContext.Provider value={{
        userItems,
        userCount,
        isLoading
    }}>
        {children}
    </UsersContext.Provider>)
}

export default UsersProvider;