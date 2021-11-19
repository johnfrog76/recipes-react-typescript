import React from 'react';
import { iRecipe } from '../../interfaces/recipe/recipe.interface';


export const getFeaturedRecipes = (recipes: iRecipe[]):iRecipe[] => {
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

export const getCategoryTags = (recipes: iRecipe[]):iRecipe[] => {
    const temp: iRecipe[] = [];

    for (let i = 0; i < recipes.length; i++) {
        if (!temp.find(item => recipes[i].category === item.category)) {
            temp.push(recipes[i]);
        }
    }

    return temp.sort((a, b) => {
        if (a.category < b.category) {
            return -1;
        }
        if (a.category > b.category) {
            return 1;
        }
        return 0;
    })
}

export const addRecipeToList = ( recipes: iRecipe[] = [], recipe?: iRecipe) => {
    if (!recipe) {
        return recipes;
    } else {
        recipes.push(recipe);
        return recipes;
    }
}

