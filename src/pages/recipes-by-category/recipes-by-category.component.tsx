import React, { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import PageTitle from "../../components/atoms/page-title/page-title.component";
import RecipesCategoryCardList from '../../components/molecules/recipes-category-card-list/recipes-category-card-list.component';
import { RecipesContext } from '../../providers/recipes/recipes.provider';
import { iRecipe } from "../../interfaces/recipe/recipe.interface";
import { MainSection } from "../../components/atoms/main-section/main-section.component";

const RecipesByCategory = () => {
    const { recipeItems } = useContext(RecipesContext);
    const [filtered, setFiltered] = useState<iRecipe[]>([]);
    const [catName, setCatName] = useState<string>('');
    const { cat_id } = useParams();
    const param_id = cat_id ? parseInt(cat_id) : -1;

    useEffect(() => {
        let temp: iRecipe[] = recipeItems.filter(item => item.cat_id === param_id);
        setFiltered(temp);
        setCatName(temp[0].category);
    }, [recipeItems]);

    return (
        <MainSection>
            <PageTitle>{catName}</PageTitle>
            <RecipesCategoryCardList recipes={filtered} />
        </MainSection>
    )
}

export default RecipesByCategory;