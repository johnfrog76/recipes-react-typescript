import React, { FC } from 'react';

import RecipeRating from '../../atoms/rating/rating.component';
import { Link } from 'react-router-dom';
import { ChevronRight } from "@material-ui/icons";

import { CardItem, CardCopy, CardBottomWrapper, CardMetaInfo, CardTitle } from './recipe-card-item.styles';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';

type Props = {
    item: iRecipe;
}


const RecipeCardItem: FC<Props> = ({ item }) => {
    return (
        <CardItem>
            <CardTitle>{item.r_name}</CardTitle>
            <CardCopy>{item?.steps?.join(' ')}</CardCopy>
            <CardBottomWrapper>
                <CardMetaInfo>
                    <span>{item.category}</span>
                    <RecipeRating rating={item.rating} />
                </CardMetaInfo>
                <Link to={`/recipes/${item._id}`}>View More <ChevronRight /></Link>
            </CardBottomWrapper>
        </CardItem>
    );
}

export default RecipeCardItem;