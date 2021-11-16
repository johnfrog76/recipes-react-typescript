import { createContext } from "react";
import RECIPES from './recipe-collection.data.json';

const RecipeCollectionContext = createContext(RECIPES);

export default RecipeCollectionContext;