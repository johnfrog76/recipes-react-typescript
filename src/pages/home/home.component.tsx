import React from "react";

import { HeroStyles, HeroSubTitle, HeroWrapper, StyledHeroGraphic } from "./home.styles";
import CategoryTags from '../../components/molecules/category-tags/category-tags.component';
import { MainSection } from "../../components/atoms/main-section/main-section.component";
import FeaturedRecipes from "../../components/molecules/featured-recipes/featured-recipes.component";

const HomePage = () => {
    return (
        <MainSection>
            <HeroWrapper>
                <StyledHeroGraphic />
                <div>
                    <HeroStyles>Recipe Box</HeroStyles>
                    <HeroSubTitle>A collection of my favorite recipes.</HeroSubTitle>
                </div>
            </HeroWrapper>
            <FeaturedRecipes />
            <CategoryTags />
        </MainSection>
    )
}

export default HomePage;

