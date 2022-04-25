import React, { FC, useContext, useState, useEffect } from 'react';

import RecipeRating from '../../atoms/rating/rating.component';
import { Link } from 'react-router-dom';
import { ChevronRight } from "@material-ui/icons";
import CheckBoxPlain from '../checkbox-plain/checkbox-plain.component';
import { ThemeContext, Theme } from '../../../providers/theme/theme.provider';
import { AuthContext } from '../../../providers/auth/auth.provider';
import { CardItem, CardCopy, CardBottomWrapper, CardTitleWrap, CardMetaInfo, CardTitle } from './recipe-card-item.styles';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';
import { iUser } from '../../../interfaces/user/user.interface';
import UserActionButtonIcon, { ButtonIconTypeEnum } from '../../atoms/user-action-button-icon/user-action-button-icon.component';

type Props = {
    item: iRecipe;
    selectMode?: boolean;
    onSelectChange?: (id: string | undefined, checked: boolean) => void;
    isBulkSelected?: boolean
}

const checkIsFavorite = (item: iRecipe, user: iUser): boolean => {
    if (item?.favorites && user) {
        let tempFav = item.favorites.find(f => f.userId === user?.userId);
        if (tempFav) {
            return true;
        }
    }

    return false;
}

const RecipeCardItem: FC<Props> = ({ item, selectMode = false, onSelectChange, isBulkSelected = false }) => {
    const { theme } = useContext(ThemeContext);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { token, isLoggedIn, user } = useContext(AuthContext);
    const [isFav, setIsFav] = useState<boolean>(false);

    const handleChange = (id: string | undefined, checked: boolean) => {
        if (onSelectChange) {
            onSelectChange(id, checked);
            if (user) {
                setIsFav(checkIsFavorite(item, user));
            }
        }
    }

    useEffect(() => {
        setIsChecked(isBulkSelected);
        handleChange(item._id, isBulkSelected);
    }, [isBulkSelected, selectMode]);

    useEffect(() => {
        if (item?.favorites && user) {
            setIsFav(checkIsFavorite(item, user))
        }

    }, [item, user]);

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
                            isChecked={isChecked}
                        />
                    )
                }
                {
                    !selectMode && isLoggedIn && (
                        <React.Fragment>
                            {
                                isFav ? (
                                    <UserActionButtonIcon icon={ButtonIconTypeEnum.favorite} title="Remove Favorite" clickHandler={() => { }} />
                                ) : (
                                    <UserActionButtonIcon icon={ButtonIconTypeEnum.unfavorite} title="Add Favorite" clickHandler={() => { }} />
                                )
                            }
                        </React.Fragment>
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