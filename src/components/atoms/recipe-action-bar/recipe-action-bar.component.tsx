import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import { useToasts } from 'react-toast-notifications';

import {
    StyledDeleteIcon,
    StyledEditIcon,
    StyledPrintIcon,
    StyledShareIcon,
    StyledRecipeActionBar,
    StyledButton
} from './recipe-action-bar.styles';

const RecicipeActionBar = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const { addToast } = useToasts();
    const { recipeItems, deleteRecipe } = useContext(RecipesContext);

    const handleDelete = () => {
        const numId = Number(id);
        const recipe = recipeItems.find(r => r.id === numId);
        if (recipe) {
            if (window.confirm('are you sure?')) {
                deleteRecipe(recipeItems, recipe);
                addToast(
                    'Success',
                    {
                        appearance: 'success',
                        autoDismiss: true
                    }
                );
                navigate('/')
            }
        }
    }

    return (
        <StyledRecipeActionBar>
            <StyledButton title="Delete" onClick={() => handleDelete()}>
                <StyledDeleteIcon />
            </StyledButton>

            <StyledButton title="Edit" onClick={() => navigate(`/edit-recipe/${id}`)}>
                <StyledEditIcon />
            </StyledButton>

            <StyledButton title="Share">
                <StyledShareIcon />
            </StyledButton>

            <StyledButton title="Print" onClick={() => window.print()}>
                <StyledPrintIcon />
            </StyledButton>
        </StyledRecipeActionBar>
    );

}

export default RecicipeActionBar;