import React, { useContext, useEffect, useState } from "react";

import { CardList } from "./featured-recipes.styles";
import { RecipesContext } from "../../../providers/recipes/recipes.provider";
import { iRecipe } from "../../../interfaces/recipe/recipe.interface";
import RecipeCardItem from '../../atoms/recipe-card-item/recipe-card-item.component';

const FeaturedRecipes = () => {
    const { recipeItems, getFeaturedRecipes } = useContext(RecipesContext);
    const [featured, setFeatured] = useState<iRecipe[]>([]);

    useEffect(() => {
        setFeatured(getFeaturedRecipes(recipeItems));
    }, [recipeItems])


    return (
        <CardList>
            {
                featured.map((item, key) => (
                    <RecipeCardItem key={key} item={item} />
                ))
            }
        </CardList>
    );
}

export default FeaturedRecipes;