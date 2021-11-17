import React from "react";

import { MainSection } from "../../components/atoms/main-section/main-section.component";
import PageTitle from "../../components/atoms/page-title/page-title.component";
import AddRecipeForm from "../../components/molecules/add-recipe-form/add-recipe-form.component";

const AddRecipePage = () => (
    <MainSection>
        <PageTitle>Add Recipe</PageTitle>
        <AddRecipeForm />
    </MainSection>
);

export default AddRecipePage;