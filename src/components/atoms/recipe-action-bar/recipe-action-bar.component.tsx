import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import { AuthContext } from '../../../providers/auth/auth.provider';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';
import UserActionButtonIcon, { ButtonIconTypeEnum } from '../user-action-button-icon/user-action-button-icon.component';
import { StyledRecipeActionBar } from './recipe-action-bar.styles';
import { removeRecipe, addFavorite, removeFavorite, copyRecipe } from '../../../services/recipes/recipes.services';
import ConfirmDialog from '../../molecules/confirm-dialog/confirm-dialog.component';

const RecicipeActionBar = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const { addToast } = useToasts();
    const { recipeItems, deleteRecipe, setSpinner, setCount,
        editRecipe, setRecipeItems } = useContext(RecipesContext);
    const { token, isLoggedIn, user } = useContext(AuthContext);

    const [favDisabled, setFavDisabled] = useState<boolean>(false);
    const [isFav, setIsFav] = useState<boolean>(false);
    const [recipe, setRecipe] = useState<iRecipe | undefined>(undefined);
    const [open, setOpen] = useState<boolean>(false);
    const [copyOpen, setCopyOpen] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);

    useEffect(() => {
        const recipe = recipeItems.find(r => r._id === id);

        if (recipe) {
            setRecipe(recipe);
        }
    }, [recipeItems, id]);

    useEffect(() => {
        if (recipe && user && recipe.user_id === user.userId) {
            setIsOwner(true);
        }
    }, [user, recipe]);

    useEffect(() => {
        if (recipe?.favorites) {
            let tempFav = recipe.favorites.find(f => f.userId === user?.userId);
            if (tempFav) {
                setIsFav(true)
            }
        }

    }, [recipe, user]);

    const handleDelete = () => {
        setSpinner(true);
        if (recipe) {
            removeRecipe(recipe, token).then((resp) => {
                deleteRecipe(recipeItems, recipe);
                setCount(recipeItems.length);
                setSpinner(false);
                addToast(
                    'Success',
                    {
                        appearance: 'success',
                        autoDismiss: true
                    }
                );
                navigate('/');

            }).catch((err) => {
                setSpinner(false);
                addToast(
                    `Error: ${err.message}`,
                    {
                        appearance: 'error',
                        autoDismiss: false
                    }
                );
            });
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const confirmCopyRecipe = () => {
        setCopyOpen(true);
    };

    const handleCopyClose = () => {
        setCopyOpen(false);
    }

    const handleCopy = () => {
        setCopyOpen(false);
        if (id && user) {
            copyRecipe(id, user.userId, user?.token).then((resp) => {
                let tempItems = recipeItems;
                tempItems.push(resp.data);
                setRecipeItems(tempItems);
                addToast(
                    'Success',
                    {
                        appearance: 'success',
                        autoDismiss: true
                    }
                );
                navigate('/recipes');
            }).catch(err => {
                addToast(
                    `Error: ${err.message}`,
                    {
                        appearance: 'error',
                        autoDismiss: false
                    }
                );
            });
        }
    }

    const handleFavorite = () => {
        setFavDisabled(true);
        if (isFav) {
            removeFavorite(id, user?.userId, token).then((resp) => {
                editRecipe(recipeItems, resp.data);
                setIsFav(false);
                setFavDisabled(false);
            }).catch(err => console.log(err.message));
        } else {
            addFavorite(id, user?.userId, token).then((resp) => {
                setIsFav(true);
                editRecipe(recipeItems, resp.data);
                setFavDisabled(false);
            }).catch(err => console.log(err.message));
        }
    }

    return (
        <React.Fragment>
            <StyledRecipeActionBar>

                {
                    isLoggedIn && (
                        <React.Fragment>
                            {
                                isFav ? (
                                    <UserActionButtonIcon
                                        title="Remove Favorite"
                                        clickHandler={() => handleFavorite()}
                                        disabled={favDisabled}
                                        icon={ButtonIconTypeEnum.favorite}
                                    />
                                ) : (
                                    <UserActionButtonIcon
                                        title="Add Favorite"
                                        clickHandler={() => handleFavorite()}
                                        disabled={favDisabled}
                                        icon={ButtonIconTypeEnum.unfavorite}
                                    />
                                )
                            }
                            {
                                isOwner && (
                                    <React.Fragment>
                                        <UserActionButtonIcon title="Delete" clickHandler={handleClickOpen} icon={ButtonIconTypeEnum.delete} />
                                        <UserActionButtonIcon title="Edit" clickHandler={() => navigate(`/edit-recipe/${id}`)} icon={ButtonIconTypeEnum.edit} />
                                    </React.Fragment>
                                )
                            }
                            <UserActionButtonIcon
                                title="Copy this Recipe"
                                clickHandler={() => confirmCopyRecipe()}
                                icon={ButtonIconTypeEnum.copy}
                            />
                        </React.Fragment>
                    )
                }
                <UserActionButtonIcon title="Print" clickHandler={() => window.print()} icon={ButtonIconTypeEnum.print} />
            </StyledRecipeActionBar>
            <ConfirmDialog
                open={open}
                title={"Are you sure?"}
                confirmText={`Delete ${recipe?.r_name} recipe?`}
                handleCancel={handleClose}
                handleConfirm={handleDelete}
            />
            <ConfirmDialog
                open={copyOpen}
                title={"Are you sure?"}
                confirmText={`Copy ${recipe?.r_name} recipe to a new recipe?`}
                handleCancel={handleCopyClose}
                handleConfirm={handleCopy}
            />
        </React.Fragment>
    );
}

export default RecicipeActionBar;
