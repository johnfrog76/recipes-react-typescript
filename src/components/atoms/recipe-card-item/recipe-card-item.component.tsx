import React, { FC, useContext, useState, useEffect, useMemo } from 'react';

import RecipeRating from '../../atoms/rating/rating.component';
import { Link } from 'react-router-dom';
import { ChevronRight } from "@material-ui/icons";
import CheckBoxPlain from '../checkbox-plain/checkbox-plain.component';
import { ThemeContext, Theme } from '../../../providers/theme/theme.provider';
import { AuthContext } from '../../../providers/auth/auth.provider';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import { CardItem, CardCopy, CardBottomWrapper, CardTitleWrap, CardMetaInfo, CardTitle } from './recipe-card-item.styles';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';
import { iUser } from '../../../interfaces/user/user.interface';
import UserActionButtonIcon, { ButtonIconTypeEnum } from '../../atoms/user-action-button-icon/user-action-button-icon.component';
import { addFavorite, removeFavorite } from '../../../services/recipes/recipes.services';
import { CategoriesContext } from '../../../providers/categories/categories.provider';

type Props = {
    item: iRecipe;
    selectMode?: boolean;
    onSelectChange?: (id: string | undefined, checked: boolean) => void;
    isBulkSelected?: boolean,
    showFavorites?: boolean,
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

const RecipeCardItem: FC<Props> = ({ item, selectMode = false, onSelectChange, isBulkSelected = false, showFavorites = true }) => {
    const { theme } = useContext(ThemeContext);
    const { recipeItems, bulkUpdateRecipes, setRecipeItems, getRecipeCategoryName } = useContext(RecipesContext);
    const { categoryItems } = useContext(CategoriesContext);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { token, isLoggedIn, user } = useContext(AuthContext);
    const [isFav, setIsFav] = useState<boolean>(false);
    const [favDisabled, setFavDisabled] = useState<boolean>(false);
    const [categoryName, setCatName] = useState<string>('');


    const handleChange = (id: string | undefined, checked: boolean) => {
        if (onSelectChange) {
            onSelectChange(id, checked);
            if (user) {
                setIsFav(checkIsFavorite(item, user));
            }
        }
    }

    const onFavoriteAction = () => {
        setFavDisabled(true);
        if (isFav) {
            removeFavorite(item._id, user?.userId, token).then((resp) => {
                setIsFav(false);
                setRecipeItems(bulkUpdateRecipes([resp.data], recipeItems));
                setFavDisabled(false);
            }).catch(err => {
                console.error(err.message);
            });
        } else {
            addFavorite(item._id, user?.userId, token).then((resp) => {
                setIsFav(true);
                setRecipeItems(bulkUpdateRecipes([resp.data], recipeItems));
                setFavDisabled(false);
            }).catch(err => {
                console.error(err.message);
            });
        }
    }

    useEffect(() => {
        if (categoryItems?.length > 0) {
            setCatName(getRecipeCategoryName(item, categoryItems));
        }
    }, [categoryItems]);

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
                    showFavorites && !selectMode && isLoggedIn && (
                        <React.Fragment>
                            {
                                isFav ? (
                                    <UserActionButtonIcon
                                        disabled={favDisabled}
                                        icon={ButtonIconTypeEnum.favorite}
                                        title="Remove Favorite"
                                        clickHandler={() => onFavoriteAction()}
                                        inverse={theme !== Theme.Light}
                                    />
                                ) : (
                                    <UserActionButtonIcon
                                        disabled={favDisabled}
                                        icon={ButtonIconTypeEnum.unfavorite}
                                        title="Add Favorite"
                                        clickHandler={() => onFavoriteAction()}
                                        inverse={theme !== Theme.Light}
                                    />
                                )
                            }
                        </React.Fragment>
                    )
                }
            </CardTitleWrap>
            <CardCopy>{item?.steps?.join(' ')}</CardCopy>
            <CardBottomWrapper ThemeStyle={theme}>
                <CardMetaInfo ThemeStyle={theme}>
                    <span>{categoryName}</span>
                    <RecipeRating inverse={theme === Theme.Light} rating={item.rating} />
                </CardMetaInfo>
                <Link to={`/recipes/${item._id}`}>View More <ChevronRight /></Link>
            </CardBottomWrapper>
        </CardItem>
    );
}

export default RecipeCardItem;