import axios from "axios";
import {
  iRecipe,
  iRecipeComment,
} from "../../interfaces/recipe/recipe.interface";

const baseURL = process.env.REACT_APP_BASEURL;
const endpoint = process.env.REACT_APP_RECIPE_ENDPOINT;
const commentEndpoint = process.env.REACT_APP_RECIPE_COMMENT_ENDPOINT;
const copyRecipeEndpoint = process.env.REACT_APP_RECIPE_COPY;
// const addFavoriteEndpoint = process.env.REACT_APP_FAVORITE_ADD;
// const removeFavoriteEndpoint = process.env.REACT_APP_FAVORITE_REMOVE;
// const addFavoriteBulkEndpoint = process.env.REACT_APP_BULK_FAVORITE_ADD;
// const removeFavoriteBulkEndpoint = process.env.REACT_APP_BULK_FAVORITE_REMOVE;
const addSharingBulkEndpoint = process.env.REACT_APP_BULK_SHARE_ADD;
const removeSharingBulkEndpoint = process.env.REACT_APP_BULK_SHARE_REMOVE;

export interface IRecipeService {
  /** Unauth collection of recipes. */
  getRecipes: () => Promise<iRecipe[]>;
  
  /** Auth collection of recipes. */
  getRecipesAuth: (token: string | null) => Promise<iRecipe[]>;
  
  /** Copy a recipe from one user to another. */
  copyRecipe: (
    recipeId: string,
    userId: string,
    token: string | null
  ) => Promise<{ data: iRecipe; message: string }>;
  
  /** Add a recipe. */
  addRecipe: (recipe: iRecipe, token: string | null) => Promise<iRecipe>;
  
  /** Update a recipe. */
  updateRecipe: (recipe: iRecipe, token: string | null) => Promise<iRecipe>;
  
  /** Delete a recipe. */
  removeRecipe: (
    recipe: iRecipe,
    token: string | null
  ) => Promise<{ message: string }>;
}

export class RecipeService implements IRecipeService {
  getRecipes() {
    return new Promise<iRecipe[]>((resolve, reject) => {
      axios
        .get<iRecipe[]>(`${baseURL}${endpoint}/unauth`)
        .then((resp) => resolve(resp.data))
        .catch((err) => reject(err));
    });
  }

  getRecipesAuth(token: string | null) {
    return new Promise<iRecipe[]>((resolve, reject) => {
      axios({
        method: "get",
        url: `${baseURL}${endpoint}/auth`,
        headers: {
          Authorization: `Bearer ${token ? token : "none"}`,
        },
      })
        .then((resp) => resolve(resp.data))
        .catch((err) => reject(err));
    });
  }

  copyRecipe(recipeId: string, userId: string, token: string | null) {
    return new Promise<{ data: iRecipe; message: string }>(
      (resolve, reject) => {
        axios({
          method: "post",
          url: `${baseURL}${copyRecipeEndpoint}`,
          data: {
            userId: userId,
            recipeId: recipeId,
          },
          headers: {
            Authorization: `Bearer ${token ? token : "none"}`,
          },
        })
          .then((resp) =>
            resolve(resp.data as unknown as { data: iRecipe; message: string })
          )
          .catch((err) => reject(err));
      }
    );
  }

  addRecipe(recipe: iRecipe, token: string | null) {
    return new Promise<iRecipe>((resolve, reject) => {
      axios({
        method: "post",
        url: `${baseURL}${endpoint}`,
        data: recipe,
        headers: {
          Authorization: `Bearer ${token ? token : "none"}`,
        },
      })
        .then((resp) => resolve(resp.data as iRecipe))
        .catch((err) => reject(err));
    });
  }

  updateRecipe(recipe: iRecipe, token: string | null) {
    return new Promise<iRecipe>((resolve, reject) => {
      axios({
        method: "patch",
        url: `${baseURL}${endpoint}/${recipe._id}`,
        data: recipe,
        headers: {
          Authorization: `Bearer ${token ? token : "none"}`,
        },
      })
        .then((resp) => resolve(resp.data.recipe))
        .catch((err) => reject(err));
    });
  }

  removeRecipe(recipe: iRecipe, token: string | null) {
    return new Promise<{ message: string }>((resolve, reject) => {
      axios({
        method: "delete",
        url: `${baseURL}${endpoint}/${recipe._id}`,
        headers: {
          Authorization: `Bearer ${token ? token : "none"}`,
        },
      })
        .then((resp) => resolve(resp.data as { message: string }))
        .catch((err) => reject(err));
    });
  }
}

// export const addFavorite = async (
//   recipeId: string | undefined,
//   userId: string | undefined,
//   token: string | null
// ) => {
//   try {
//     const resp = await axios({
//       method: "post",
//       url: `${baseURL}${addFavoriteEndpoint}`,
//       data: {
//         recipeId: recipeId,
//         userId: userId || "none",
//       },
//       headers: {
//         Authorization: `Bearer ${token ? token : "none"}`,
//       },
//     });
//     return resp.data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const removeFavorite = async (
//   recipeId: string | undefined,
//   userId: string | undefined,
//   token: string | null
// ) => {
//   try {
//     const resp = await axios({
//       method: "post",
//       url: `${baseURL}${removeFavoriteEndpoint}`,
//       data: {
//         recipeId: recipeId || "none",
//         userId: userId || "none",
//       },
//       headers: {
//         Authorization: `Bearer ${token ? token : "none"}`,
//       },
//     });
//     return resp.data;
//   } catch (err) {
//     throw err;
//   }
// };

export const addRecipeComment = async (
  commentItem: iRecipeComment,
  recipeId: string,
  token: string | null
) => {
  try {
    const resp = await axios({
      method: "patch",
      url: `${baseURL}${commentEndpoint}/${recipeId}`,
      data: commentItem,
      headers: {
        Authorization: `Bearer ${token ? token : "none"}`,
      },
    });

    return resp.data.recipe;
  } catch (err) {
    throw err;
  }
};

// export const addFavoriteBulk = async (
//   recipesList: string[],
//   userId: string | undefined,
//   token: string | null
// ) => {
//   try {
//     const resp = await axios({
//       method: "post",
//       url: `${baseURL}${addFavoriteBulkEndpoint}`,
//       data: {
//         recipesList: recipesList,
//         userId: userId || "none",
//       },
//       headers: {
//         Authorization: `Bearer ${token ? token : "none"}`,
//       },
//     });
//     return resp.data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const removeFavoriteBulk = async (
//   recipesList: string[],
//   userId: string | undefined,
//   token: string | null
// ) => {
//   try {
//     const resp = await axios({
//       method: "post",
//       url: `${baseURL}${removeFavoriteBulkEndpoint}`,
//       data: {
//         recipesList: recipesList,
//         userId: userId || "none",
//       },
//       headers: {
//         Authorization: `Bearer ${token ? token : "none"}`,
//       },
//     });
//     return resp.data;
//   } catch (err) {
//     throw err;
//   }
// };

export const removeShareBulk = async (
  recipesList: string[],
  userId: string | undefined,
  token: string | null
) => {
  try {
    const resp = await axios({
      method: "patch",
      url: `${baseURL}${removeSharingBulkEndpoint}`,
      data: {
        recipesList: recipesList,
        userId: userId || "none",
      },
      headers: {
        Authorization: `Bearer ${token ? token : "none"}`,
      },
    });
    return resp.data;
  } catch (err) {
    throw err;
  }
};

export const addShareBulk = async (
  recipesList: string[],
  userId: string | undefined,
  token: string | null
) => {
  try {
    const resp = await axios({
      method: "patch",
      url: `${baseURL}${addSharingBulkEndpoint}`,
      data: {
        recipesList: recipesList,
        userId: userId || "none",
      },
      headers: {
        Authorization: `Bearer ${token ? token : "none"}`,
      },
    });
    return resp.data;
  } catch (err) {
    throw err;
  }
};
