import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TagContainer, TagList } from './category-tabs.styles';
import RecipeCollectionContext from '../../../contexts/recipe-collection/recipe-collection.context';
import { iRecipe } from "../../../interfaces/recipe/recipe.interface";


const CategoryTags = () => {
    const recipes = useContext(RecipeCollectionContext);
    const [uniques, setUniques] = useState<iRecipe[]>([]);

    useEffect(() => {
        const temp: iRecipe[] = [];
        for (let i = 0; i < recipes.length; i++) {
            if (!temp.find(item => recipes[i].category === item.category)) {
                temp.push(recipes[i]);
            }
        }
        setUniques(temp.sort((a, b) => {
            if (a.category < b.category) {
                return -1;
            }
            if (a.category > b.category) {
                return 1;
            }
            return 0;
        }))
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