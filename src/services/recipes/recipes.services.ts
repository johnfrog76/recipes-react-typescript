import axios from 'axios';
import { iRecipe } from '../../interfaces/recipe/recipe.interface';

const baseURL = process.env.REACT_APP_BASEURL;
const endpoint = process.env.REACT_APP_RECIPE_ENDPOINT;
const commentEndpoint = process.env.REACT_APP_RECIPE_COMMENT_ENDPOINT;

export const getRecipes = async () => {
    try {

        const resp = await axios.get<iRecipe[]>(`${baseURL}${endpoint}`);
        return resp.data;
    } catch (err) {
        throw(err)
    }
}

export const addRecipe = async (recipe: iRecipe, token: string | null) => {
    try {
        const resp = await axios({
            method: 'post',
            url: `${baseURL}${endpoint}`,
            data: recipe,
            headers: {
                Authorization: `Bearer ${token ? token : 'none'}`
            }
        });
        return resp.data;
    } catch (err) {
        throw(err)
    }
}

export const updateRecipe = async (recipe: iRecipe, token: string | null) => {
    try {
        const resp = await axios({
            method: 'patch',
            url: `${baseURL}${endpoint}/${recipe._id}`,
            data: recipe,
            headers: {
                Authorization: `Bearer ${token ? token : 'none'}`
            }
        });
        return resp.data.recipe;
    } catch (err) {
        throw(err)
    }
}

export const removeRecipe = async (recipe: iRecipe, token: string | null) => {
    try {
        const resp = await axios({
            method: 'delete',
            url: `${baseURL}${endpoint}/${recipe._id}`,
            headers: {
                Authorization: `Bearer ${token ? token : 'none'}`
            }
        })

        return resp.data.message;
    } catch (err) {
        throw(err)
    }
}

export const addRecipeComment = async (commentItem: { comment: string, user: string}, recipeId: string, token: string | null) => {
    try {
        const resp = await axios({
            method: 'patch',
            url: `${baseURL}${commentEndpoint}/${recipeId}`,
            data: commentItem,
            headers: {
                Authorization: `Bearer ${token ? token : 'none'}`
            }
        });

        return resp.data.recipe;
    } catch (err) {
        throw(err)
    }
}
