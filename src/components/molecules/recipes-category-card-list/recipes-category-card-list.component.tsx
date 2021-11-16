import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { StyledCardContainer } from './recipes-category-card-list.styles';

import RecipeCardItem from '../../atoms/recipe-card-item/recipe-card-item.component';
import RecipeCollectionContext from '../../../contexts/recipe-collection/recipe-collection.context';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';

const RecipesCategoryCardList = () => {
    const recipes = useContext(RecipeCollectionContext);
    const [filtered, setFiltered] = useState<iRecipe[]>([]);
    const { cat_id } = useParams();

    const param_id = cat_id ? parseInt(cat_id) : -1;

    useEffect(() => {
        let temp: iRecipe[] = recipes.filter((item, idx) => item.cat_id === param_id);
        setFiltered(temp);

    }, [recipes]);

    return (
        <StyledCardContainer>
            {
                filtered.map((item, key) => (<RecipeCardItem key={key} item={item} />))
            }
            {
                filtered.length === 1 && <div></div>
            }
        </StyledCardContainer>
    );
};

export default RecipesCategoryCardList;