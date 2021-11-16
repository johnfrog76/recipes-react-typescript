import React from "react";
import { HeroStyles, HeroSubTitle, HeroWrapper } from "./home.styles";
import CategoryTags from '../../components/molecules/category-tags/category-tags.component';
import { MainSection } from "../../components/atoms/main-section/main-section.component";
import FeaturedRecipes from "../../components/molecules/featured-recipes/featured-recipes.component";



const HomePage = () => {
    return (
        <MainSection>
            <HeroWrapper>
                <HeroStyles>My Recipe Box</HeroStyles>
                <HeroSubTitle>Here is a collection of my favorite recipes.</HeroSubTitle>
            </HeroWrapper>
            <FeaturedRecipes />
            <CategoryTags />
        </MainSection>
    )
}

export default HomePage;

