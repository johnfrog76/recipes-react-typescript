import React, { FC, useContext, useEffect, useState } from 'react';

import { StyledDiv } from './recipe-content-owner.styles';
import { UsersContext } from '../../../providers/users/users.provider';
import { iUserItem } from '../../../interfaces/users/users.interface';

interface Props {
    userId: string;
    shared: boolean;
}

const RecipeContentOwner: FC<Props> = ({ userId, shared }) => {
    const [user, setUser] = useState<iUserItem | null>(null);

    const { userItems } = useContext(UsersContext);
    const action = shared ? 'Shared by' : 'Posted by';

    useEffect(() => {
        const findUser = userItems.find(u => u.id === userId);

        if (findUser) {
            setUser(findUser);
        }
    }, [userItems])

    return (
        <StyledDiv>
            <span>{action} {user?.name || 'admin'}</span>
        </StyledDiv>
    );
}

export default RecipeContentOwner;