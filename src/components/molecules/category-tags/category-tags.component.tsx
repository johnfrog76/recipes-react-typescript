import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TagContainer, TagList } from './category-tabs.styles';
import RecipeCollectionContext from '../../../contexts/recipe-collection/recipe-collection.context';
import { iRecipe } from "../../../interfaces/recipe/recipe.interface";
import { getCategoryTags } from '../../../contexts/recipe-collection/recipe-collection.utils';


const CategoryTags = () => {
    const recipes = useContext(RecipeCollectionContext);
    const [uniques, setUniques] = useState<iRecipe[]>([]);

    useEffect(() => {
        setUniques(getCategoryTags(recipes))
    }, [recipes])

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