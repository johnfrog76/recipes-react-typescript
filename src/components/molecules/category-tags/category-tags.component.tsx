import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TagContainer, TagList } from './category-tabs.styles';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import { CategoriesContext } from "../../../providers/categories/categories.provider";
import { iRecipeCategory } from "../../../interfaces/category/category.interface";

const CategoryTags = () => {
    const { recipeItems } = useContext(RecipesContext);
    const { categoryItems } = useContext(CategoriesContext);
    const [uniques, setUniques] = useState<iRecipeCategory[]>([]);

    useEffect(() => {
        const tempItems: iRecipeCategory[] = [];

        for (let i = 0; i < recipeItems.length; i++) {
            if (!tempItems.find(t => t._id === recipeItems[i].cat_id)) {
                const catIdx: number = categoryItems.findIndex(c => c._id === recipeItems[i].cat_id);
                if (catIdx !== -1) {
                    tempItems.push(categoryItems[catIdx]);
                }
            }
        }

        setUniques(tempItems.sort((a, b) => {
            var textA = a.name.toLowerCase();
            var textB = b.name.toLowerCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }))
    }, [recipeItems, categoryItems])

    return (
        <React.Fragment>
            {
                uniques.length > 0 && (
                    <TagContainer>
                        <TagList>
                            {
                                uniques.map((item, key) => (<li key={key}>
                                    <Link to={`/recipes/category/${item._id}`}>{item.name}</Link>
                                </li>))
                            }
                        </TagList>
                    </TagContainer>
                )
            }
        </React.Fragment>
    )
}

export default CategoryTags;