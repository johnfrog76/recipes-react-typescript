import React, { useContext, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { MainSection } from '../../components/atoms/main-section/main-section.component';
import PageTitle from '../../components/atoms/page-title/page-title.component';
import { UsersContext } from '../../providers/users/users.provider';
import { RecipesContext } from '../../providers/recipes/recipes.provider';
import { iUserItem } from '../../interfaces/users/users.interface';
import { iRecipe } from '../../interfaces/recipe/recipe.interface';
import RecipesCategoryCardList from '../../components/molecules/recipes-category-card-list/recipes-category-card-list.component';

const UserRecipesPage = () => {
    const { id } = useParams();
    const { userItems } = useContext(UsersContext);
    const { recipeItems } = useContext(RecipesContext);
    const [user, setUser] = useState<iUserItem | null>(null);
    const [usersRecipes, setUsersRecipes] = useState<iRecipe[]>([]);

    useEffect(() => {
        const tempUser = userItems.filter(u => u.id === id);
        if (tempUser) {
            setUser(tempUser[0]);
        }
    }, [userItems, id])

    useEffect(() => {
        if (user !== null) {
            setUsersRecipes(recipeItems.filter(r => r.user_id === user.id))
        }
    }, [user, recipeItems]);

    return (
        <MainSection>
            <PageTitle>
                {user ? (
                    <span>{user.name} Recipes ({usersRecipes.length})</span>
                ) : (
                    <span>User Recipes</span>
                )
                }
            </PageTitle>
            <RecipesCategoryCardList recipes={usersRecipes} />
        </MainSection>
    );
}

export default UserRecipesPage;