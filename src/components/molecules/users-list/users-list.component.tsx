import React, { useContext, useEffect, useState } from 'react';

import { iUserItem } from '../../../interfaces/users/users.interface';
import { UsersContext } from '../../../providers/users/users.provider';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import UserCard from '../user-card/user-card.component';
import { StyledUserCardList } from './users-list.styles';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';

const UsersList = () => {
    const { recipeItems } = useContext(RecipesContext);
    const { userItems } = useContext(UsersContext);
    const [users, setUsers] = useState<iUserItem[]>([]);

    useEffect(() => {
        const usersWithRecipe = userItems.map(user => {
            const recipes: string[] = recipeItems.filter(
                r => r.shared === true && r.user_id === user.id
            ).map(r => r.r_name);

            return {
                ...user,
                recipes: recipes || []
            }
        })
        setUsers(usersWithRecipe);
    }, [userItems])

    return (
        <StyledUserCardList>
            {
                users.map(({ name, id, recipes }, idx) => (
                    <UserCard key={idx} name={name} id={id} recipes={recipes || []} />
                ))
            }
        </StyledUserCardList >
    )
}

export default UsersList;