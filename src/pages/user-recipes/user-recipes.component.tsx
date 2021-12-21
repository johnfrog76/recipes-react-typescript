import React, { useContext, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { MainSection } from '../../components/atoms/main-section/main-section.component';
import PageTitle from '../../components/atoms/page-title/page-title.component';
import { UsersContext } from '../../providers/users/users.provider';
import { RecipesContext } from '../../providers/recipes/recipes.provider';
import { AuthContext } from '../../providers/auth/auth.provider';
import { iUserItem } from '../../interfaces/users/users.interface';
import { iRecipe } from '../../interfaces/recipe/recipe.interface';
import { EmptyMesssage } from '../../components/atoms/empty-message/empty-message.component';
import RecipesCategoryCardList from '../../components/molecules/recipes-category-card-list/recipes-category-card-list.component';

const UserRecipesPage = () => {
    const { id } = useParams();
    const { userItems } = useContext(UsersContext);
    const { recipeItems } = useContext(RecipesContext);
    const { user: authUser } = useContext(AuthContext);
    const [user, setUser] = useState<iUserItem | null>(null);
    const [usersRecipes, setUsersRecipes] = useState<iRecipe[]>([]);
    const [isContentOwner, setIsContentOwner] = useState<boolean>(false);

    useEffect(() => {
        if (authUser && authUser.userId === id) {
            setIsContentOwner(true);
        }
    }, [authUser, id]);

    useEffect(() => {
        const tempUser = userItems.filter(u => u.id === id);
        if (tempUser) {
            setUser(tempUser[0]);
        }
    }, [userItems, id])

    useEffect(() => {
        if (user !== null && !isContentOwner) {
            setUsersRecipes(recipeItems.filter(r => r.user_id === user.id && r.shared))
        } else if (user !== null && isContentOwner) {
            setUsersRecipes(recipeItems.filter(r => r.user_id === user.id))
        }
    }, [user, recipeItems]);

    return (
        <MainSection>
            <PageTitle>
                {
                    user && isContentOwner ? (
                        <span>{`${user.name} recipe${usersRecipes.length !== 1 ? 's' : ''} (${usersRecipes.length})`}</span>
                    ) : (
                        <span>{`${user?.name} shared${usersRecipes.length} recipe${usersRecipes.length !== 1 ? 's' : ''}`}</span>
                    )
                }
            </PageTitle>
            {
                usersRecipes.length !== 0 ? (
                    <RecipesCategoryCardList recipes={usersRecipes} />
                ) : (
                    <EmptyMesssage msg="There are no recipes." />
                )
            }
        </MainSection>
    );
}

export default UserRecipesPage;