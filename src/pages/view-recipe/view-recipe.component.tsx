import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { DetailsTopWrapper, MetaInfoWrapper } from './view-recipe.styles';
import RecipeViewDetails from '../../components/molecules/recipe-view-details/recipe-view-details.component';
import RecipeRating from '../../components/atoms/rating/rating.component';
import PageTitle from '../../components/atoms/page-title/page-title.component';
import { MainSection } from "../../components/atoms/main-section/main-section.component";
import RecipeCollectionContext from "../../contexts/recipe-collection/recipe-collection.context";

const RecipeDetailPage = () => {
    const { id } = useParams();
    const numId: number | undefined = id ? parseInt(id) : -1;
    const recipes = useContext(RecipeCollectionContext);
    const recipe = recipes.find(r => r.id === numId);

    return (
        <MainSection>
            <DetailsTopWrapper>
                <PageTitle>{recipe?.r_name} </PageTitle>
                <MetaInfoWrapper>
                    <RecipeRating rating={recipe?.rating} />
                    <span>Cateory: {recipe?.category}</span>
                </MetaInfoWrapper>
            </DetailsTopWrapper>
            <RecipeViewDetails recipe={recipe} id={id} />
        </MainSection>
    );
}

export default RecipeDetailPage;