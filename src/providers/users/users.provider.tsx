import React, { createContext, FC, useState, useEffect } from 'react';
import { iUserItem } from '../../interfaces/users/users.interface';
import { addUserItem, removeUserItem } from './users.utilities';
import { getUsers } from '../../services/users/users.service';


type UsersContextType = {
    userItems: iUserItem[];
    isLoading: boolean;
    userCount: number;
    addUserItem: (val1: iUserItem, val2: iUserItem[]) => iUserItem[];
    removeUserItem: (val1: iUserItem, val2: iUserItem[]) => iUserItem[];
}

export const UsersContext = createContext<UsersContextType>({
    userItems: [],
    userCount: 0,
    isLoading: true,
    addUserItem: addUserItem,
    removeUserItem: removeUserItem
});

interface Props {
    children?: React.ReactNode;
}


const UsersProvider: FC<Props> = ({ children }) => {
    const [userItems, setUserItems] = useState<iUserItem[]>([]);
    const [userCount, setUserCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getUsers().then(({ users }) => {
            if (users) {
                const sorted = users.sort(
                    (a: iUserItem, b: iUserItem) => (
                        a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
                    ));
                setUserItems(sorted);
                setUserCount(users.length);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (<UsersContext.Provider value={{
        userItems,
        userCount,
        isLoading,
        addUserItem,
        removeUserItem
    }}>
        {children}
    </UsersContext.Provider>)
}

export default UsersProvider;