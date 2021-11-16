import React, { useContext, useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';

import { StyledCardContainer } from './recipes-category-card-list.styles';

import RecipeCardItem from '../../atoms/recipe-card-item/recipe-card-item.component';
import RecipeCollectionContext from '../../../contexts/recipe-collection/recipe-collection.context';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';

interface Props {
    recipes?: iRecipe[]
}

const RecipesCategoryCardList: FC<Props> = ({ recipes = [] }) => (
    <StyledCardContainer>
        {
            recipes.map((item, key) => (<RecipeCardItem key={key} item={item} />))
        }
    </StyledCardContainer>

);

export default RecipesCategoryCardList;