import React, { FC, useContext } from 'react';

import RecipeRating from '../../atoms/rating/rating.component';
import { Link } from 'react-router-dom';
import { ChevronRight } from "@material-ui/icons";

import { ThemeContext, Theme } from '../../../providers/theme/theme.provider';
import { CardItem, CardCopy, CardBottomWrapper, CardMetaInfo, CardTitle } from './recipe-card-item.styles';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';

type Props = {
    item: iRecipe;
}


const RecipeCardItem: FC<Props> = ({ item }) => {
    const { theme } = useContext(ThemeContext)
    return (
        <CardItem ThemeStyle={theme}>
            <CardTitle>{item.r_name}</CardTitle>
            <CardCopy>{item?.steps?.join(' ')}</CardCopy>
            <CardBottomWrapper ThemeStyle={theme}>
                <CardMetaInfo ThemeStyle={theme}>
                    <span>{item.category}</span>
                    <RecipeRating inverse={theme === Theme.Light} rating={item.rating} />
                </CardMetaInfo>
                <Link to={`/recipes/${item._id}`}>View More <ChevronRight /></Link>
            </CardBottomWrapper>
        </CardItem>
    );
}

export default RecipeCardItem;