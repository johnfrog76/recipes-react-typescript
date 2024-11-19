import axios from "axios";
import {
  iRecipe,
  iRecipeComment,
} from "../../interfaces/recipe/recipe.interface";

const baseURL = process.env.REACT_APP_BASEURL;
const endpoint = process.env.REACT_APP_RECIPE_ENDPOINT;
const commentEndpoint = process.env.REACT_APP_RECIPE_COMMENT_ENDPOINT;
const copyRecipeEndpoint = process.env.REACT_APP_RECIPE_COPY;
const addSharingBulkEndpoint = process.env.REACT_APP_BULK_SHARE_ADD;
const removeSharingBulkEndpoint = process.env.REACT_APP_BULK_SHARE_REMOVE;

export interface IShareResponse {
  data: iRecipe[];
  error: [];
  message: string;
}

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

  /** Comment on a recipe */
  addRecipeComment: (
    commentItem: iRecipeComment,
    recipeId: string,
    token: string | null
  ) => Promise<iRecipe>;

  /** Remove sharing from list of recipes */
  removeShareBulk: (
    recipesList: string[],
    userId: string | undefined,
    token: string | null
  ) => Promise<IShareResponse>;

  /** Add sharing to list of recipes */
  addShareBulk: (
    recipesList: string[],
    userId: string | undefined,
    token: string | null
  ) => Promise<IShareResponse>;
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

  addRecipeComment(
    commentItem: iRecipeComment,
    recipeId: string,
    token: string | null
  ) {
    return new Promise<iRecipe>((resolve, reject) => {
      axios({
        method: "patch",
        url: `${baseURL}${commentEndpoint}/${recipeId}`,
        data: commentItem,
        headers: {
          Authorization: `Bearer ${token ? token : "none"}`,
        },
      })
        .then((resp) => resolve(resp.data.recipe as iRecipe))
        .catch((err) => reject(err));
    });
  }

  removeShareBulk(
    recipesList: string[],
    userId: string | undefined,
    token: string | null
  ) {
    return new Promise<IShareResponse>((resolve, reject) => {
      axios({
        method: "patch",
        url: `${baseURL}${removeSharingBulkEndpoint}`,
        data: {
          recipesList: recipesList,
          userId: userId || "none",
        },
        headers: {
          Authorization: `Bearer ${token ? token : "none"}`,
        },
      })
        .then((resp) => resolve(resp.data as IShareResponse))
        .catch((err) => reject(err));
    });
  }

  addShareBulk(
    recipesList: string[],
    userId: string | undefined,
    token: string | null
  ) {
    return new Promise<IShareResponse>((resolve, reject) => {
      axios({
        method: "patch",
        url: `${baseURL}${addSharingBulkEndpoint}`,
        data: {
          recipesList: recipesList,
          userId: userId || "none",
        },
        headers: {
          Authorization: `Bearer ${token ? token : "none"}`,
        },
      })
        .then((resp) => resolve(resp.data as IShareResponse))
        .catch((err) => reject(err));
    });
  }
}
