import axios from 'axios';
import { iRecipe, iRecipeComment } from '../../interfaces/recipe/recipe.interface';

const baseURL = process.env.REACT_APP_BASEURL;
const endpoint = process.env.REACT_APP_RECIPE_ENDPOINT;
const commentEndpoint = process.env.REACT_APP_RECIPE_COMMENT_ENDPOINT;
const addFavoriteEndpoint = process.env.REACT_APP_FAVORITE_ADD;
const copyRecipeEndpoint = process.env.REACT_APP_RECIPE_COPY;
const removeFavoriteEndpoint = process.env.REACT_APP_FAVORITE_REMOVE;
const addFavoriteBulkEndpoint = process.env.REACT_APP_BULK_FAVORITE_ADD;
const removeFavoriteBulkEndpoint = process.env.REACT_APP_BULK_FAVORITE_REMOVE;
const addSharingBulkEndpoint = process.env.REACT_APP_BULK_SHARE_ADD;
const removeSharingBulkEndpoint = process.env.REACT_APP_BULK_SHARE_REMOVE;

export const getRecipes = async () => {
    try {
        const resp = await axios.get<iRecipe[]>(`${baseURL}${endpoint}/unauth`);
        return resp.data;
    } catch (err) {
        throw(err);
    }
};

export const getRecipesAuth = async (token: string | null) => {
    try {
        const resp = await axios({
            method: 'get',
            url: `${baseURL}${endpoint}/auth`,
            headers: {
                Authorization: `Bearer ${token ? token : 'none'}`
            }
        });

        return resp.data;
    } catch (err) {
        throw(err);
    }
};


export const copyRecipe = async (recipeId: string, userId: string, token: string | null) => {
    try {
        const resp = await axios({
            method: 'post',
            url: `${baseURL}${copyRecipeEndpoint}`,
            data: {
                userId: userId,
                recipeId: recipeId
            },
            headers: {
                Authorization: `Bearer ${token ? token : 'none'}`
            }
        });
        return resp.data;
    } catch (err) {
        throw(err);
    }
};


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
        throw(err);
    }
};

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
};

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
};

export const addFavorite = async (recipeId: string | undefined, userId:string | undefined, token: string | null) => {
    try {
        const resp = await axios({
            method: 'post',
            url: `${baseURL}${addFavoriteEndpoint}`,
            data: {
                recipeId: recipeId,
                userId: userId || 'none'
            },
            headers: {
                Authorization: `Bearer ${token ? token : 'none'}`
            }
        });
        return resp.data;
    } catch (err) {
        throw(err)
    }
};

export const removeFavorite = async (recipeId: string | undefined, userId:string | undefined, token: string | null) => {
    try {
        const resp = await axios({
            method: 'post',
            url: `${baseURL}${removeFavoriteEndpoint}`,
            data: {
                recipeId: recipeId || 'none',
                userId: userId || 'none'
            },
            headers: {
                Authorization: `Bearer ${token ? token : 'none'}`
            }
        });
        return resp.data;
    } catch (err) {
        throw(err)
    }
};

export const addRecipeComment = async (commentItem: iRecipeComment, recipeId: string, token: string | null) => {
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
};

export const addFavoriteBulk = async (recipesList: string[], userId:string | undefined, token: string | null) => {
    try {
        const resp = await axios({
            method: 'post',
            url: `${baseURL}${addFavoriteBulkEndpoint}`,
            data: {
                recipesList: recipesList,
                userId: userId || 'none'
            },
            headers: {
                Authorization: `Bearer ${token ? token : 'none'}`
            }
        });
        return resp.data;
    } catch (err) {
        throw(err)
    }
};

export const removeFavoriteBulk = async (recipesList: string[], userId:string | undefined, token: string | null) => {
    try {
        const resp = await axios({
            method: 'post',
            url: `${baseURL}${removeFavoriteBulkEndpoint}`,
            data: {
                recipesList: recipesList,
                userId: userId || 'none'
            },
            headers: {
                Authorization: `Bearer ${token ? token : 'none'}`
            }
        });
        return resp.data;
    } catch (err) {
        throw(err)
    }
};

export const removeShareBulk = async (recipesList: string[], userId:string | undefined, token: string | null) => {
    try {
        const resp = await axios({
            method: 'patch',
            url: `${baseURL}${removeSharingBulkEndpoint}`,
            data: {
                recipesList: recipesList,
                userId: userId || 'none'
            },
            headers: {
                Authorization: `Bearer ${token ? token : 'none'}`
            }
        });
        return resp.data;
    } catch (err) {
        throw(err)
    }
};

export const addShareBulk = async (recipesList: string[], userId:string | undefined, token: string | null) => {
    try {
        const resp = await axios({
            method: 'patch',
            url: `${baseURL}${addSharingBulkEndpoint}`,
            data: {
                recipesList: recipesList,
                userId: userId || 'none'
            },
            headers: {
                Authorization: `Bearer ${token ? token : 'none'}`
            }
        });
        return resp.data;
    } catch (err) {
        throw(err)
    }
};
