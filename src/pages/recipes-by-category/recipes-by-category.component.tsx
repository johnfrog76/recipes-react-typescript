import React from "react";
import { StyledPageTitle } from './recipes-by-category.styles';
import RecipesCategoryCardList from '../../components/molecules/recipes-category-card-list/recipes-category-card-list.component';
import { MainSection } from "../../components/atoms/main-section/main-section.component";

const RecipesByCategory = () => (
    <MainSection>
        <StyledPageTitle>Recipes by Category</StyledPageTitle>
        <RecipesCategoryCardList />
    </MainSection>
);

export default RecipesByCategory;