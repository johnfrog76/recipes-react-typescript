import React, { FC, createContext, useState, useEffect } from 'react';
// import RECIPES from './recipe-collection.data.json';
import { getFeaturedRecipes, getCategoryTags, addRecipeToList, editRecipe, deleteRecipe } from './recipes.utils';

import { iRecipe } from '../../interfaces/recipe/recipe.interface';
import { getRecipes } from '../../services/recipes/recipes.services';

type RecipeContextType = {
    recipeItems: iRecipe[];
    recipeCount: number;
    getFeaturedRecipes: (recipes: iRecipe[]) => iRecipe[];
    getCategoryTags: (recipes: iRecipe[]) => iRecipe[];
    addRecipeToList: (recipes: iRecipe[], recipe?: iRecipe) => iRecipe[];
    editRecipe: (recipes: iRecipe[], recipe?: iRecipe) => iRecipe[];
    deleteRecipe: (recipes: iRecipe[], recipe?: iRecipe) => iRecipe[];
    setSpinner: (val: boolean) => void;
    setCount: (val: number) => void;
    isLoading: boolean;
}

export const RecipesContext = createContext<RecipeContextType>({
    recipeItems: [],
    recipeCount: 0,
    getFeaturedRecipes: ([]) => [],
    getCategoryTags: ([]) => [],
    addRecipeToList: ([]) => [],
    editRecipe: ([]) => [],
    deleteRecipe: ([]) => [],
    setSpinner: () => { },
    setCount: () => { },
    isLoading: true
});


interface Props {
    children?: React.ReactNode;
}

const RecipesProvider: FC<Props> = ({ children }) => {
    const [recipeItems, setRecipeItems] = useState<iRecipe[]>([]);
    const [recipeCount, setRecipeCount] = useState<number>(0);
    const [makeRequest, setMakeRequest] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const setSpinner = (val = true) => setIsLoading(val);
    const setCount = (val = 0) => setRecipeCount(val);

    useEffect(() => {
        if (makeRequest) {
            // console.log('make request');
            setMakeRequest(false);
            getRecipes().then((resp) => {
                // delay is to see spinner
                setTimeout(() => {
                    setSpinner(false);
                    if (resp) {
                        setRecipeItems(resp);
                        setCount(resp.length);
                    }
                }, 1500);
            }).catch((err) => {
                setSpinner(false);
                console.log(err);
            })

            // keep this to push this to populate recipe JSON
            // let myRecipeList = RECIPES.map(({ _id, ...rest }) => rest);
            // let count = 0;
            // const addItem = () => {
            //     addRecipe(myRecipeList[count]).then((resp) => {
            //         count += 1;
            //         if (count < myRecipeList.length) {
            //             addItem()
            //         } else {
            //             console.log('finished')
            //         }
            //     })

            // };
            //addItem();
        }

    }, [makeRequest])

    return (<RecipesContext.Provider
        value={{
            recipeItems,
            recipeCount,
            getFeaturedRecipes,
            getCategoryTags,
            addRecipeToList,
            editRecipe,
            deleteRecipe,
            setSpinner,
            setCount,
            isLoading
        }}
    >{children}</RecipesContext.Provider>)
};

export default RecipesProvider;