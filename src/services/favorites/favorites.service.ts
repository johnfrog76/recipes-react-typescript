import axios from "axios";
import { iRecipe } from "../../interfaces/recipe/recipe.interface";
const baseURL = process.env.REACT_APP_BASEURL;
const addFavoriteEndpoint = process.env.REACT_APP_FAVORITE_ADD;
const removeFavoriteEndpoint = process.env.REACT_APP_FAVORITE_REMOVE;
const addFavoriteBulkEndpoint = process.env.REACT_APP_BULK_FAVORITE_ADD;
const removeFavoriteBulkEndpoint = process.env.REACT_APP_BULK_FAVORITE_REMOVE;

export interface IFavoritesResponse {
  message: string;
  data: iRecipe;
}

export interface IFavoritesBulkResponse {
  message: string;
  data: iRecipe[];
  errors: [];
}

export interface IFavoritesService {
  addFavorite: (
    recipeId: string | undefined,
    userId: string | undefined,
    token: string | null
  ) => Promise<IFavoritesResponse>;

  removeFavorite: (
    recipeId: string | undefined,
    userId: string | undefined,
    token: string | null
  ) => Promise<IFavoritesResponse>;

  addFavoriteBulk: (
    recipesList: string[],
    userId: string | undefined,
    token: string | null
  ) => Promise<IFavoritesBulkResponse>;

  removeFavoriteBulk: (
    recipesList: string[],
    userId: string | undefined,
    token: string | null
  ) => Promise<IFavoritesBulkResponse>;
}

export class FavoritesService implements IFavoritesService {
  addFavorite(
    recipeId: string | undefined,
    userId: string | undefined,
    token: string | null
  ) {
    return new Promise<IFavoritesResponse>((resolve, reject) => {
      axios({
        method: "post",
        url: `${baseURL}${addFavoriteEndpoint}`,
        data: {
          recipeId: recipeId,
          userId: userId || "none",
        },
        headers: {
          Authorization: `Bearer ${token ? token : "none"}`,
        },
      })
        .then((resp) => resolve(resp.data as IFavoritesResponse))
        .catch((err) => reject(err));
    });
  }

  removeFavorite(
    recipeId: string | undefined,
    userId: string | undefined,
    token: string | null
  ) {
    return new Promise<IFavoritesResponse>((resolve, reject) => {
      axios({
        method: "post",
        url: `${baseURL}${removeFavoriteEndpoint}`,
        data: {
          recipeId: recipeId || "none",
          userId: userId || "none",
        },
        headers: {
          Authorization: `Bearer ${token ? token : "none"}`,
        },
      })
        .then((resp) => resolve(resp.data as IFavoritesResponse))
        .catch((err) => reject(err));
    });
  }

  addFavoriteBulk(
    recipesList: string[],
    userId: string | undefined,
    token: string | null
  ) {
    return new Promise<IFavoritesBulkResponse>((resolve, reject) => {
      axios({
        method: "post",
        url: `${baseURL}${addFavoriteBulkEndpoint}`,
        data: {
          recipesList: recipesList,
          userId: userId || "none",
        },
        headers: {
          Authorization: `Bearer ${token ? token : "none"}`,
        },
      })
        .then((resp) => {
          resolve(resp.data as IFavoritesBulkResponse);
        })
        .catch((err) => reject(err));
    });
  }

  removeFavoriteBulk(
    recipesList: string[],
    userId: string | undefined,
    token: string | null
  ) {
    return new Promise<IFavoritesBulkResponse>((resolve, reject) => {
      axios({
        method: "post",
        url: `${baseURL}${removeFavoriteBulkEndpoint}`,
        data: {
          recipesList: recipesList,
          userId: userId || "none",
        },
        headers: {
          Authorization: `Bearer ${token ? token : "none"}`,
        },
      })
        .then((resp) => {
          resolve(resp.data as IFavoritesBulkResponse);
        })
        .catch((err) => reject(err));
    });
  }
}
