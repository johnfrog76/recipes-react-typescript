import React, { FC, useEffect, useContext, useState } from "react";

import CommentItem from '../../atoms/comments-list-item/comments-list-item.component';
import RecipeContentOwner from '../../atoms/recipe-content-owner/recipe-content-owner.component';
import { StyledDetailsDiv, StyledH4, StyledListItem, StyledList, StyledHRule } from './recipe-view-details.styles';
import { RecipesContext } from "../../../providers/recipes/recipes.provider";
import { AuthContext } from "../../../providers/auth/auth.provider";
import AddCommentForm from "../../../templates/add-comment/add-comment.component";
import { iRecipe } from "../../../interfaces/recipe/recipe.interface";

interface Props {
    recipe?: iRecipe;
    id?: string;
}

const RecipeViewDetails: FC<Props> = ({ id }) => {

    const { recipeItems, editRecipe } = useContext(RecipesContext);
    const { user } = useContext(AuthContext);
    const [recipe, setRecipe] = useState<iRecipe | undefined | null>(undefined);

    const onCommentSubmit = (recipe: iRecipe) => {
        editRecipe(recipeItems, recipe);
        setRecipe(recipe);
    }

    useEffect(() => {
        const tempRecipe = recipeItems.find(r => r._id === id);
        if (tempRecipe) {
            setRecipe(tempRecipe);
        } else {
            setRecipe(null);
        }
    }, [recipeItems])

    if (!recipe) {
        return (
            <StyledDetailsDiv>
                <p>No recipe found</p>
            </StyledDetailsDiv>
        )
    }

    return (
        <StyledDetailsDiv>
            <StyledH4>Ingredients</StyledH4>
            <StyledList>
                {
                    recipe.ingredients?.map((item, key) => (
                        <StyledListItem key={key}>{item}</StyledListItem>
                    ))
                }
            </StyledList>
            <StyledH4>Steps</StyledH4>
            <ul>
                {
                    recipe.steps?.map((item, key) => (<StyledListItem key={key}>{item}</StyledListItem>))
                }
            </ul>
            <StyledHRule />
            <ul>
                {
                    recipe.comments?.map((item, key) => (
                        <CommentItem key={key} item={item} />
                    ))
                }
            </ul>
            <RecipeContentOwner shared={recipe.shared} userId={recipe.user_id} />
            {
                user !== null && (
                    <AddCommentForm recipeId={id} handleSubmit={onCommentSubmit} />
                )
            }
        </StyledDetailsDiv>
    );
}

export default RecipeViewDetails;