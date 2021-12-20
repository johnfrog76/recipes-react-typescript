import React, { useContext } from "react";

import { HeroStyles, HeroSubTitle, HeroWrapper, StyledHeroGraphic, SpinnerWrapper } from "./home.styles";
import CategoryTags from '../../components/molecules/category-tags/category-tags.component';
import { MainSection } from "../../components/atoms/main-section/main-section.component";
import FeaturedRecipes from "../../components/molecules/featured-recipes/featured-recipes.component";
import { RecipesContext } from "../../providers/recipes/recipes.provider";
import Spinner from "../../components/molecules/spinner/spinner.component";

const HomePage = () => {
    const { isLoading } = useContext(RecipesContext);

    return (
        <MainSection>
            <HeroWrapper>
                <StyledHeroGraphic />
                <div>
                    <HeroStyles>Recipe Box test</HeroStyles>
                    <HeroSubTitle>A collection of my favorite recipes</HeroSubTitle>
                </div>
            </HeroWrapper>
            {
                isLoading && (
                    <SpinnerWrapper>
                        <Spinner />
                    </SpinnerWrapper>
                )
            }
            {
                !isLoading && (
                    <React.Fragment>
                        <FeaturedRecipes />
                        <CategoryTags />
                    </React.Fragment>
                )
            }
        </MainSection>
    )
}

export default HomePage;

