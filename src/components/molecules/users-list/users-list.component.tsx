import React, { useContext, useEffect, useState } from 'react';

import { iUserItem } from '../../../interfaces/users/users.interface';
import { UsersContext } from '../../../providers/users/users.provider';
import { StyledUserCard, StyledNavLink, StyledUserCardList } from './users-list.styles';
import UserAvatar from '../../atoms/user-avatar/user-avatar.component';

const UsersList = () => {
    const { userItems } = useContext(UsersContext);
    const [users, setUsers] = useState<iUserItem[]>([]);

    useEffect(() => {
        setUsers(userItems);

    }, [userItems])


    return (
        <StyledUserCardList>
            {
                users.map((item, idx) => (
                    <li key={idx}>
                        <StyledUserCard title={item.email}>
                            <UserAvatar name={item.name} />
                            <div>
                                <div>{item.name}</div>
                                <StyledNavLink to={`/user-recipes/${item.id}`}>View recipes</StyledNavLink>
                            </div>
                        </StyledUserCard>
                    </li>
                ))
            }
        </StyledUserCardList >
    )
}

export default UsersList;