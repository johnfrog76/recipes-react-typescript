import React, { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import PageTitle from "../../components/atoms/page-title/page-title.component";
import RecipesCategoryCardList from '../../components/molecules/recipes-category-card-list/recipes-category-card-list.component';
import RecipeCollectionContext from "../../contexts/recipe-collection/recipe-collection.context";
import { iRecipe } from "../../interfaces/recipe/recipe.interface";
import { MainSection } from "../../components/atoms/main-section/main-section.component";

const RecipesByCategory = () => {
    const recipes = useContext(RecipeCollectionContext);
    const [filtered, setFiltered] = useState<iRecipe[]>([]);
    const { cat_id } = useParams();
    const param_id = cat_id ? parseInt(cat_id) : -1;

    useEffect(() => {
        let temp: iRecipe[] = recipes.filter((item, idx) => item.cat_id === param_id);
        setFiltered(temp);

    }, [recipes]);

    return (
        <MainSection>
            <PageTitle>Recipes by Category</PageTitle>
            <RecipesCategoryCardList recipes={filtered} />
        </MainSection>
    )
}

export default RecipesByCategory;