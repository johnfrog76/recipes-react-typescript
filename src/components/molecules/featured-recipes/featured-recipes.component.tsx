import React, { useContext, useEffect, useState } from "react";

import { CardList } from "./featured-recipes.styles";
import RecipeCollectionContext from "../../../contexts/recipe-collection/recipe-collection.context";
import { iRecipe } from "../../../interfaces/recipe/recipe.interface";
import RecipeCardItem from '../../atoms/recipe-card-item/recipe-card-item.component';
import { getFeaturedRecipes } from '../../../contexts/recipe-collection/recipe-collection.utils';

const FeaturedRecipes = () => {
    const recipes = useContext(RecipeCollectionContext);
    const [featured, setFeatured] = useState<iRecipe[]>([]);

    useEffect(() => {
        setFeatured(getFeaturedRecipes(recipes))
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