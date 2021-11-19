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
}

export const RecipesContext = createContext<RecipeContextType>({
    recipeItems: [],
    recipeCount: 0,
    getFeaturedRecipes: ([]) => [],
    getCategoryTags: ([]) => [],
    addRecipeToList: ([]) => []
});


interface Props {
    children?: React.ReactNode;
}

const RecipesProvider: FC<Props> = ({ children }) => {
    const [recipeItems, setRecipeItems] = useState<iRecipe[]>([]);
    const [recipeCount, setRecipeCount] = useState<number>(0)

    useEffect(() => {
        setTimeout(() => {
            setRecipeItems(RECIPES);
            setRecipeCount(RECIPES.length)

        }, 3000)
    }, [recipeItems])

    return (<RecipesContext.Provider
        value={{
            recipeItems,
            recipeCount,
            getFeaturedRecipes,
            getCategoryTags,
            addRecipeToList
        }}
    >{children}</RecipesContext.Provider>)
};

export default RecipesProvider;