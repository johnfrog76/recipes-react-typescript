import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { StyledList, StyledListItem } from './recipe-list.styles';

import { iRecipe } from '../../../interfaces/recipe/recipe.interface';

interface Props {
    recipes?: iRecipe[]
}

const RecipeList: FC<Props> = ({ recipes = [] }) => {

    return (
        <StyledList>
            {
                recipes.map(item => (
                    <StyledListItem key={item.id}>
                        <Link to={`/recipes/${item.id}`}>
                            {item.r_name}
                        </Link>
                    </StyledListItem>
                ))
            }
        </StyledList>
    )
}

export default RecipeList;