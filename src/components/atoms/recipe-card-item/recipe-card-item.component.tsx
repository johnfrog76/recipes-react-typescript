import React, { ChangeEventHandler, FC, useContext } from 'react';

import RecipeRating from '../../atoms/rating/rating.component';
import { Link } from 'react-router-dom';
import { ChevronRight } from "@material-ui/icons";
import CheckBoxPlain from '../checkbox-plain/checkbox-plain.component';
import { ThemeContext, Theme } from '../../../providers/theme/theme.provider';
import { CardItem, CardCopy, CardBottomWrapper, CardTitleWrap, CardMetaInfo, CardTitle } from './recipe-card-item.styles';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';

type Props = {
    item: iRecipe;
    selectMode?: boolean;
    onSelectChange?: (id: string | undefined, checked: boolean) => void;
}

const RecipeCardItem: FC<Props> = ({ item, selectMode = false, onSelectChange }) => {
    const { theme } = useContext(ThemeContext);

    const handleChange = (id: string | undefined, checked: boolean) => {
        if (onSelectChange) {
            onSelectChange(id, checked);
        }
    }
    return (
        <CardItem ThemeStyle={theme}>
            <CardTitleWrap>
                <CardTitle>{item.r_name}</CardTitle>
                {
                    selectMode && (
                        <CheckBoxPlain
                            id={item._id || 'none'}
                            value={item._id || 'none'}
                            inputChangeHandler={handleChange}
                        />
                    )
                }
            </CardTitleWrap>
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