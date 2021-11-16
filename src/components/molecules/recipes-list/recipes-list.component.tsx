import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StyledList, StyledListItem } from './recipe-list.styles';

import RecipeCollectionContext from '../../../contexts/recipe-collection/recipe-collection.context';

const RecipeList = () => {
    const recipes = useContext(RecipeCollectionContext);

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