import React, { FC, useEffect, useState } from 'react';

import { StyledCardContainer } from './recipes-category-card-list.styles';
import RecipeCardItem from '../../atoms/recipe-card-item/recipe-card-item.component';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';

interface Props {
    recipes?: iRecipe[];
    selectMode?: boolean;
    onSelectChange?: (id: string | undefined, checked: boolean) => void;
    isBulkSelected?: boolean;
}

const RecipesCategoryCardList: FC<Props> = ({ recipes = [], selectMode = false, onSelectChange, isBulkSelected = false }) => {
    const [isBulk, setIsbulk] = useState(isBulkSelected);

    useEffect(() => {
        setIsbulk(isBulkSelected);
    }, [isBulkSelected, selectMode]);

    return (
        <StyledCardContainer>
            {
                recipes.map((item, key) => (
                    <RecipeCardItem
                        key={key}
                        item={item}
                        selectMode={selectMode}
                        onSelectChange={onSelectChange}
                        isBulkSelected={isBulk}
                    />
                ))
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
}


export default RecipesCategoryCardList;