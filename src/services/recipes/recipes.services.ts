import axios from 'axios';
import { iRecipe } from '../../interfaces/recipe/recipe.interface';

type iPatch = {
    recipe: iRecipe;
}

type iDelete = {
    message: string;
}

const baseURL = process.env.REACT_APP_BASEURL;
const endpoint = process.env.REACT_APP_RECIPE_ENDPOINT;

export const getRecipes = async () => {
    try {

        const resp = await axios.get<iRecipe[]>(`${baseURL}${endpoint}`);
        return resp.data;
    } catch (err) {
        throw(err)
    }
}

export const addRecipe = async (recipe: iRecipe) => {
    try {
        const resp = await axios.post<iRecipe>(`${baseURL}${endpoint}`, recipe);
        return resp.data;
    } catch (err) {
        throw(err)
    }
}

export const updateRecipe = async (recipe: iRecipe) => {
    try {
        const resp = await axios.patch<iPatch>(
            `${baseURL}${endpoint}/${recipe._id}`,
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
            `${baseURL}${endpoint}/${recipe._id}`
        );
        return resp.data.message;
    } catch (err) {
        throw(err)
    }
}
