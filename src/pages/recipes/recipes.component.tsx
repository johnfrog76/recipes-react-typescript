import React, { useState, useContext } from "react";

import { MainSection } from "../../components/atoms/main-section/main-section.component";
import PageTitle from "../../components/atoms/page-title/page-title.component";
import RecipeList from "../../components/molecules/recipes-list/recipes-list.component";
import ListGridToggleButton from "../../components/atoms/list-grid-toggle/list-grid-toggle.component";
import { RecipesContext } from '../../providers/recipes/recipes.provider';
import RecipeCardList from '../../components/molecules/recipes-category-card-list/recipes-category-card-list.component';
import { StyledTitleWrapper } from './recipes.styles'

const RecipesPage = () => {
    const [isGridView, setIsGridView] = useState<boolean>(true);
    const { recipeItems } = useContext(RecipesContext);

    const onButtonClick = () => setIsGridView(!isGridView);

    return (
        <MainSection>
            <StyledTitleWrapper>
                <PageTitle>Recipes ({recipeItems.length})</PageTitle>
                <ListGridToggleButton grid={isGridView} onClick={onButtonClick} />
            </StyledTitleWrapper>
            {
                isGridView ? (
                    <RecipeCardList recipes={recipeItems} />
                ) : (
                    <RecipeList recipes={recipeItems} />
                )
            }
        </MainSection>
    );
}

export default RecipesPage;