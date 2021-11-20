import React, { FC, createContext, useState, useEffect } from 'react';
import RECIPES from './recipe-collection.data.json';
import { getFeaturedRecipes, getCategoryTags, addRecipeToList } from './recipes.utils';
import { iRecipe } from '../../interfaces/recipe/recipe.interface';

type RecipeContextType = {
    recipeItems: iRecipe[];
    recipeCount: number;
    getFeaturedRecipes: (recipes: iRecipe[]) => iRecipe[];
    getCategoryTags: (recipes: iRecipe[]) => iRecipe[];
    addRecipeToList: (recipes: iRecipe[], recipe?: iRecipe) => iRecipe[];
    isLoading: boolean;
}

export const RecipesContext = createContext<RecipeContextType>({
    recipeItems: [],
    recipeCount: 0,
    getFeaturedRecipes: ([]) => [],
    getCategoryTags: ([]) => [],
    addRecipeToList: ([]) => [],
    isLoading: false
});


interface Props {
    children?: React.ReactNode;
}

const RecipesProvider: FC<Props> = ({ children }) => {
    const [recipeItems, setRecipeItems] = useState<iRecipe[]>([]);
    const [recipeCount, setRecipeCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setRecipeItems(RECIPES);
            setRecipeCount(recipeItems.length);
            setIsLoading(false);

        }, 3000)
    }, [recipeItems])

    return (<RecipesContext.Provider
        value={{
            recipeItems,
            recipeCount,
            getFeaturedRecipes,
            getCategoryTags,
            addRecipeToList,
            isLoading
        }}
    >{children}</RecipesContext.Provider>)
};

export default RecipesProvider;