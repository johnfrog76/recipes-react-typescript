import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TagContainer, TagList } from './category-tabs.styles';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import { AuthContext } from "../../../providers/auth/auth.provider";
import { iRecipe } from "../../../interfaces/recipe/recipe.interface";
import { UsersContext } from "../../../providers/users/users.provider";

const CategoryTags = () => {
    const { recipeItems, getCategoryTags } = useContext(RecipesContext);
    const { user } = useContext(AuthContext);
    const [uniques, setUniques] = useState<iRecipe[]>([]);

    useEffect(() => {
        const filterList: iRecipe[] = recipeItems.filter((r) => r.shared || r.user_id === user?.userId);
        setUniques(getCategoryTags(filterList))
    }, [recipeItems, getCategoryTags, user])

    return (
        <React.Fragment>
            {
                uniques.length > 0 && (
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
        </React.Fragment>
    )
}

export default CategoryTags;