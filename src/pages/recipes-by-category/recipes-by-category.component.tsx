import React, { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import PageTitle from "../../components/atoms/page-title/page-title.component";
import RecipesCategoryCardList from '../../components/molecules/recipes-category-card-list/recipes-category-card-list.component';
import { RecipesContext } from '../../providers/recipes/recipes.provider';
import { AuthContext } from "../../providers/auth/auth.provider";
import { iRecipe } from "../../interfaces/recipe/recipe.interface";
import { SpinnerWrapper } from './recipes-by-category.styles';
import { MainSection } from "../../components/atoms/main-section/main-section.component";
import Spinner from "../../components/molecules/spinner/spinner.component";

const RecipesByCategory = () => {
    const { recipeItems, isLoading } = useContext(RecipesContext);
    const { user } = useContext(AuthContext);
    const [filtered, setFiltered] = useState<iRecipe[]>([]);
    const [catName, setCatName] = useState<string>('');
    const { cat_id } = useParams();
    const param_id = cat_id ? parseInt(cat_id) : -1;

    useEffect(() => {
        if (!isLoading && param_id) {
            const filterList: iRecipe[] = recipeItems.filter((r) => r.cat_id === param_id && (r.shared || r.user_id === user?.userId));

            if (filterList.length > 0) {
                setFiltered(filterList);
                setCatName(filterList[0].category);
            }
        }
    }, [recipeItems, isLoading, param_id]);

    return (
        <MainSection>
            <PageTitle>{catName}</PageTitle>
            <RecipesCategoryCardList recipes={filtered} />
            {
                isLoading && (
                    <SpinnerWrapper>
                        <Spinner />
                    </SpinnerWrapper>
                )
            }
        </MainSection>
    )
}

export default RecipesByCategory;