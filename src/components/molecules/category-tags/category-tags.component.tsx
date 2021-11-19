import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TagContainer, TagList } from './category-tabs.styles';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import { iRecipe } from "../../../interfaces/recipe/recipe.interface";

const CategoryTags = () => {
    const { recipeItems, getCategoryTags } = useContext(RecipesContext);
    const [uniques, setUniques] = useState<iRecipe[]>([]);

    useEffect(() => {
        setUniques(getCategoryTags(recipeItems))
    }, [recipeItems])

    return (
        <TagContainer>
            <TagList>
                {
                    uniques.map((item, key) => (<li key={key}>
                        <Link to={`/recipes/category/${item.cat_id}`}>{item.category}</Link>
                    </li>))
                }
            </TagList>
        </TagContainer>
    )
}

export default CategoryTags;