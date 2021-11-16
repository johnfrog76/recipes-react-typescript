import React, { useContext, useEffect, useState } from "react";

import { CardList } from "./featured-recipes.styles";
import RecipeCollectionContext from "../../../contexts/recipe-collection/recipe-collection.context";
import { iRecipe } from "../../../interfaces/recipe/recipe.interface";
import RecipeCardItem from '../../atoms/recipe-card-item/recipe-card-item.component';

const FeaturedRecipes = () => {
    const recipes = useContext(RecipeCollectionContext);
    const [featured, setFeatured] = useState<iRecipe[]>([]);

    useEffect(() => {
        const items: iRecipe[] = [];
        for (let i = recipes.length; i > 0; i--) {
            if (items.length < 3) {
                items.push(recipes[Math.floor(Math.random() * recipes.length)]);
            } else {
                setFeatured(items);
                break;
            }
        }
    }, [recipes])


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