import { iRecipeCategory } from "../../interfaces/category/category.interface";
import { iRecipe } from "../../interfaces/recipe/recipe.interface";

export const getFeaturedRecipes = (recipes: iRecipe[]): iRecipe[] => {
  const items: iRecipe[] = [];
  const copy = recipes.slice(0);
  const NUM = 3;

  for (let i = copy.length; i > 0; i--) {
    if (items.length < NUM) {
      let random = Math.floor(Math.random() * copy.length);
      items.push(copy[random]);
      copy.splice(random, 1);
    } else {
      break;
    }
  }
  return items;
};

export const addRecipeToList = (recipes: iRecipe[] = [], recipe?: iRecipe) => {
  if (!recipe) {
    return recipes;
  } else {
    recipes.push(recipe);
    return recipes;
  }
};

export const editRecipe = (recipes: iRecipe[] = [], recipe?: iRecipe) => {
  if (!recipe) {
    return recipes;
  } else {
    const index = recipes.findIndex((index) => index._id === recipe._id);
    const updated = recipes.splice(index, 1, recipe);
    return updated;
  }
};

export const deleteRecipe = (recipes: iRecipe[] = [], recipe?: iRecipe) => {
  if (!recipe) {
    return recipes;
  } else {
    const index = recipes.findIndex((index) => index._id === recipe._id);
    const updated = recipes.splice(index, 1);
    return updated;
  }
};

export const bulkUpdateRecipes = (
  itemsToUpdate: iRecipe[],
  recipesList: iRecipe[]
) => {
  if (itemsToUpdate.length === 0) {
    return recipesList;
  }

  const updated = recipesList.map((r) => {
    const updatedItem = itemsToUpdate.find((i) => i._id === r._id);
    return updatedItem ? updatedItem : r;
  });

  return updated;
};

export const getRecipeCategoryName = (
  recipeItem: iRecipe,
  categoryList: iRecipeCategory[]
): string => {
  let catIdx: number = categoryList.findIndex(
    (c) => c._id === recipeItem.cat_id
  );
  return catIdx === -1 ? "Not found" : categoryList[catIdx].name;
};
