import axios, { Axios } from 'axios';
import { iRecipe } from '../../interfaces/recipe/recipe.interface';

type iPatch = {
    recipe: iRecipe;
}

type iDelete = {
    message: string;
}

export const getRecipes = async () => {
    try {

        const resp = await axios.get<iRecipe[]>('http://localhost:5000/api/recipes');
        return resp.data;
    } catch (err) {
        throw(err)
    }
}

export const addRecipe = async (recipe: iRecipe) => {
    try {
        const resp = await axios.post<iRecipe>('http://localhost:5000/api/recipes', recipe);
        return resp.data;
    } catch (err) {
        throw(err)
    }
}

export const updateRecipe = async (recipe: iRecipe) => {
    try {
        const resp = await axios.patch<iPatch>(
            `http://localhost:5000/api/recipes/${recipe._id}`,
            recipe
        );
        return resp.data.recipe;
    } catch (err) {
        throw(err)
    }
}

export const removeRecipe = async (recipe: iRecipe) => {
    try {
        const resp = await axios.delete<iDelete>(
            `http://localhost:5000/api/recipes/${recipe._id}`
        );
        return resp.data.message;
    } catch (err) {
        throw(err)
    }
}
