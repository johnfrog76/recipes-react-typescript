import React, { useContext, useEffect, useState } from 'react';

import { UsersContext } from '../../../providers/users/users.provider';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import { AuthContext } from '../../../providers/auth/auth.provider';
import { iUserItem } from '../../../interfaces/users/users.interface';

import UserCard from '../user-card/user-card.component';
import EmptyMesssage from '../../atoms/empty-message/empty-message.component';
import { StyledUserCardList } from './users-list.styles';

const UsersList = () => {
    const { recipeItems } = useContext(RecipesContext);
    const { userItems } = useContext(UsersContext);
    const { user: authUser } = useContext(AuthContext);
    const [users, setUsers] = useState<iUserItem[]>([]);

    useEffect(() => {
        const usersWithRecipe = userItems.map(user => {
            let recipes: string[] = [];
            const isAuthUser = () => authUser && authUser.userId === user.id;
            if (isAuthUser()) {
                recipes = recipeItems.filter(
                    r => r.user_id === user.id
                ).map(r => r.r_name);
            } else {
                recipes = recipeItems.filter(
                    r => r.shared === true && r.user_id === user.id
                ).map(r => r.r_name);
            }

            return {
                ...user,
                recipes: recipes || []
            }
        })
        setUsers(usersWithRecipe);
    }, [userItems, authUser]);

    return (
        <React.Fragment>
            {
                users.length !== 0 ? (
                    <StyledUserCardList>
                        {
                            users.map(({ name, id, recipes }, idx) => (
                                <UserCard
                                    key={idx}
                                    name={name}
                                    id={id}
                                    isContentOwner={authUser !== null && authUser.userId === id}
                                    recipes={recipes || []}
                                />
                            ))
                        }
                    </StyledUserCardList >
                ) : (
                    <EmptyMesssage msg={'There are no users.'} />
                )
            }
        </React.Fragment>
    )
}

export default UsersList;