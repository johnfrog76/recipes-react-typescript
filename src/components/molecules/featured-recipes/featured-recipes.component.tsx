import React, { useContext, useEffect, useState } from "react";

import { CardList } from "./featured-recipes.styles";
import { RecipesContext } from "../../../providers/recipes/recipes.provider";
import { AuthContext } from "../../../providers/auth/auth.provider";
import { iRecipe } from "../../../interfaces/recipe/recipe.interface";
import RecipeCardItem from '../../atoms/recipe-card-item/recipe-card-item.component';

const FeaturedRecipes = () => {
    const { recipeItems, getFeaturedRecipes } = useContext(RecipesContext);
    const { user } = useContext(AuthContext);
    const [featured, setFeatured] = useState<iRecipe[]>([]);

    useEffect(() => {
        const filterList: iRecipe[] = recipeItems.filter((r) => r.shared || r.user_id === user?.userId);
        setFeatured(getFeaturedRecipes(filterList));
    }, [recipeItems, user, getFeaturedRecipes])


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