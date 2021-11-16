import React from "react";

import { StyledPageTitle } from './recipes.styles'
import { MainSection } from "../../components/atoms/main-section/main-section.component";
import RecipeList from "../../components/molecules/recipes-list/recipes-list.component";

const RecipesPage = () => (
    <MainSection>
        <StyledPageTitle>Recipes</StyledPageTitle>
        <RecipeList />
    </MainSection>
);

export default RecipesPage;