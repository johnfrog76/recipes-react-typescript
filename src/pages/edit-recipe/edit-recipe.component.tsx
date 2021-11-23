import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RecipesContext } from '../../providers/recipes/recipes.provider';
import { MainSection } from '../../components/atoms/main-section/main-section.component';
import Spinner from '../../components/molecules/spinner/spinner.component';
import PageTitle from '../../components/atoms/page-title/page-title.component';
import { SpinnerOuter } from '../../components/molecules/spinner/spinner.styles';
import EditRecipeForm from '../../components/molecules/edit-recipe-form/edit-recipe-form.component';


const EditRecipePage = () => {
    const { id } = useParams();
    const numId: number | undefined = id ? parseInt(id) : -1;

    const { isLoading } = useContext(RecipesContext);

    return (
        <MainSection>
            <PageTitle>Edit Recipe</PageTitle>
            {
                isLoading && <SpinnerOuter><Spinner /></SpinnerOuter>
            }
            {
                !isLoading && <EditRecipeForm recipeId={numId}></EditRecipeForm>
            }
        </MainSection>
    );
}

export default EditRecipePage;