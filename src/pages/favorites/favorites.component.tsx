import React, { useState, useContext, useEffect } from "react";

import { MainSection } from "../../components/atoms/main-section/main-section.component";
import PageTitle from "../../components/atoms/page-title/page-title.component";
import RecipeList from "../../components/molecules/recipes-list/recipes-list.component";
import ListGridToggleButton from "../../components/atoms/list-grid-toggle/list-grid-toggle.component";
import { RecipesContext } from '../../providers/recipes/recipes.provider';
import { AuthContext } from "../../providers/auth/auth.provider";
import { UsersContext } from "../../providers/users/users.provider";
import RecipeCardList from '../../components/molecules/recipes-category-card-list/recipes-category-card-list.component';
import { StyledTitleWrapper, StyledSpinnerWrap } from './favorites.styles';
import EmptyMesssage from "../../components/atoms/empty-message/empty-message.component";
import Spinner from "../../components/molecules/spinner/spinner.component";
import { iRecipe } from "../../interfaces/recipe/recipe.interface";

const FavoritesPage = () => {
    const [isGridView, setIsGridView] = useState<boolean>(true);
    const [filteredRecipes, setFilteredRecipes] = useState<iRecipe[]>([]);
    const { recipeItems, recipeCount, isLoading } = useContext(RecipesContext);
    const { user } = useContext(AuthContext);
    const { userItems } = useContext(UsersContext);

    const onButtonClick = () => setIsGridView(!isGridView);

    useEffect(() => {
        if (user) {
            let filteredItems: iRecipe[] = recipeItems.filter(r => r.favorites?.length && user && r.favorites.some(f => f.userId === user.userId))
            setFilteredRecipes(filteredItems);
        }
    }, [user, recipeItems]);

    return (
        <MainSection>
            <StyledTitleWrapper>
                <PageTitle>Favorite Recipes ({filteredRecipes.length})</PageTitle>
                <ListGridToggleButton grid={isGridView} onClick={onButtonClick} />
            </StyledTitleWrapper>
            {
                isLoading && (
                    <StyledSpinnerWrap>
                        <Spinner />
                    </StyledSpinnerWrap>
                )
            }
            {
                !isLoading && filteredRecipes.length !== 0 &&
                    isGridView ? (
                    <RecipeCardList recipes={filteredRecipes} />
                ) : (
                    <RecipeList recipes={filteredRecipes} />
                )
            }
            {
                !isLoading && filteredRecipes.length === 0 &&
                <EmptyMesssage msg={'No favorite recipes'} />
            }
        </MainSection>
    );
}

export default FavoritesPage;