import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { DetailsTopWrapper, MetaInfoWrapper, MetaInfoBottom, MetaInfoTop } from './view-recipe.styles';
import RecipeViewDetails from '../../components/molecules/recipe-view-details/recipe-view-details.component';
import RecipeRating from '../../components/atoms/rating/rating.component';
import PageTitle from '../../components/atoms/page-title/page-title.component';
import { MainSection } from "../../components/atoms/main-section/main-section.component";
import { RecipesContext } from '../../providers/recipes/recipes.provider';
import RecipeActionBar from '../../components/atoms/recipe-action-bar/recipe-action-bar.component';
import Spinner from "../../components/molecules/spinner/spinner.component";
import { SpinnerOuter } from "../../components/molecules/spinner/spinner.styles";
import { CategoriesContext } from "../../providers/categories/categories.provider";
import { iRecipe } from "../../interfaces/recipe/recipe.interface";

const RecipeDetailPage = () => {
    const { id } = useParams();
    const [recipeCategoryName, setRecipeCategoryName] = useState<string>('');
    const [recipe, setRecipe] = useState<iRecipe>();
    const { recipeItems, isLoading, setSpinner, getRecipeCategoryName } = useContext(RecipesContext);
    const { categoryItems } = useContext(CategoriesContext);


    useEffect(() => {
        setRecipe(recipeItems.find(r => r._id === id));
    }, [recipeItems]);

    useEffect(() => {
        if (recipe && recipeItems?.length > 0) {
            setRecipeCategoryName(getRecipeCategoryName(recipe, categoryItems));
        }
    }, [recipe, recipeItems])

    return (
        <MainSection>
            {
                isLoading && (
                    <React.Fragment>
                        <PageTitle>Recipe Details</PageTitle>
                        <SpinnerOuter>
                            <Spinner />
                        </SpinnerOuter>
                    </React.Fragment>
                )
            }
            {
                !isLoading && (
                    <React.Fragment>
                        <DetailsTopWrapper>
                            <PageTitle>{recipe?.r_name} </PageTitle>
                            <MetaInfoWrapper>
                                <MetaInfoTop>
                                    <RecipeRating rating={recipe?.rating} />
                                    <span>Cateory: {recipeCategoryName}</span>
                                </MetaInfoTop>
                                <MetaInfoBottom>
                                    <RecipeActionBar />
                                </MetaInfoBottom>
                            </MetaInfoWrapper>
                        </DetailsTopWrapper>
                        <RecipeViewDetails recipe={recipe} id={id} />
                    </React.Fragment>
                )
            }
        </MainSection>
    );
}

export default RecipeDetailPage;