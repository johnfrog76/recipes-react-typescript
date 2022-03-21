import React, { FC, createContext, useState, useEffect, useContext } from 'react';
import {
    getFeaturedRecipes, getCategoryTags, addRecipeToList, editRecipe, deleteRecipe
} from './recipes.utils';
import { AuthContext } from '../auth/auth.provider';
import { iRecipe } from '../../interfaces/recipe/recipe.interface';
import { getRecipes, getRecipesAuth } from '../../services/recipes/recipes.services';

type RecipeContextType = {
    recipeItems: iRecipe[];
    recipeCount: number;
    getFeaturedRecipes: (recipes: iRecipe[]) => iRecipe[];
    getCategoryTags: (recipes: iRecipe[]) => iRecipe[];
    addRecipeToList: (recipes: iRecipe[], recipe?: iRecipe) => iRecipe[];
    editRecipe: (recipes: iRecipe[], recipe?: iRecipe) => iRecipe[];
    deleteRecipe: (recipes: iRecipe[], recipe?: iRecipe) => iRecipe[];
    setSpinner: (val: boolean) => void;
    makeFreshPull: (val: boolean) => void;
    setCount: (val: number) => void;
    isLoading: boolean;
    makeRequest: boolean;
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
    makeFreshPull: () => { },
    isLoading: true,
    makeRequest: true
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
    const makeFreshPull = (val = true) => setMakeRequest(val);
    const setCount = (val = 0) => setRecipeCount(val);
    const { token, isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (makeRequest) {
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
                console.error(err);
            });

            if (isLoggedIn) {
                getRecipesAuth(token).then((resp) => {
                    // delay is to see spinner
                    setTimeout(() => {
                        setRecipeItems(resp);
                        setCount(resp.length);
                        setSpinner(false);
                    }, 1500);
                }).catch((err) => {
                    setSpinner(false);
                    console.log(err)
                });
            }
        }
    }, [makeRequest]);

    useEffect(() => {
        if (isLoggedIn) {
            setSpinner(true);
            makeFreshPull(true);
        }
    }, [isLoggedIn])

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
            isLoading,
            makeRequest,
            makeFreshPull
        }}
    >{children}</RecipesContext.Provider>)
};

export default RecipesProvider;