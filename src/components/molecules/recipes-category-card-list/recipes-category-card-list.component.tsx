import React, { FC } from 'react';

import { StyledCardContainer } from './recipes-category-card-list.styles';
import RecipeCardItem from '../../atoms/recipe-card-item/recipe-card-item.component';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';

interface Props {
    recipes?: iRecipe[];
    selectMode?: boolean;
    onSelectChange?: (id: string | undefined, checked: boolean) => void;
}

const RecipesCategoryCardList: FC<Props> = ({ recipes = [], selectMode = false, onSelectChange }) => (
    <StyledCardContainer>
        {
            recipes.map((item, key) => (<RecipeCardItem key={key} item={item} selectMode={selectMode} onSelectChange={onSelectChange} />))
        }
        {
            recipes.length < 3 && (
                <React.Fragment>
                    <div></div>
                    <div></div>
                </React.Fragment>
            )
        }
    </StyledCardContainer>

);

export default RecipesCategoryCardList;