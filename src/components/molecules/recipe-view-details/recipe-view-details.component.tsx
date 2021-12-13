import React, { FC } from "react";
import CommentItem from '../../atoms/comments-list-item/comments-list-item.component';
import RecipeContentOwner from '../../atoms/recipe-content-owner/recipe-content-owner.component';
import { StyledDetailsDiv, StyledH4, StyledListItem, StyledList, StyledHRule } from './recipe-view-details.styles'
import { iRecipe } from "../../../interfaces/recipe/recipe.interface";

interface Props {
    recipe?: iRecipe;
    id?: string;
}

const RecipeViewDetails: FC<Props> = ({ recipe, id }) => {

    if (!recipe) {
        return (
            <StyledDetailsDiv>
                <p>No recipe found with id {id}.</p>
            </StyledDetailsDiv>
        )
    }
    const { ingredients, steps, comments } = recipe;

    return (
        <StyledDetailsDiv>
            <StyledH4>Ingredients</StyledH4>
            <StyledList>
                {
                    ingredients?.map((item, key) => (
                        <StyledListItem key={key}>{item}</StyledListItem>
                    ))
                }
            </StyledList>
            <StyledH4>Steps</StyledH4>
            <ul>
                {
                    steps?.map((item, key) => (<StyledListItem key={key}>{item}</StyledListItem>))
                }
            </ul>
            <StyledHRule />
            <ul>
                {
                    comments?.map((item, key) => (
                        <CommentItem key={key} item={item} />
                    ))
                }
            </ul>
            <RecipeContentOwner shared={recipe.shared} userId={recipe.user_id} />
        </StyledDetailsDiv>
    );
}

export default RecipeViewDetails;