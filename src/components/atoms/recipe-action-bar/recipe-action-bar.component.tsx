import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useToasts } from 'react-toast-notifications';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import { AuthContext } from '../../../providers/auth/auth.provider';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';
import UserActionButtonIcon, { ButtonIconTypeEnum } from '../user-action-button-icon/user-action-button-icon.component';
import { removeRecipe, addFavorite, removeFavorite } from '../../../services/recipes/recipes.services';
import ConfirmDialog from '../../molecules/confirm-dialog/confirm-dialog.component';

import {
    StyledShareIcon,
    StyledRecipeActionBar,
    StyledButton,
    StyledTextarea
} from './recipe-action-bar.styles';

const RecicipeActionBar = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const { addToast } = useToasts();
    const { recipeItems, deleteRecipe, setSpinner, setCount,
        editRecipe } = useContext(RecipesContext);
    const { token, isLoggedIn, user } = useContext(AuthContext);

    const [favDisabled, setFavDisabled] = useState<boolean>(false);
    const [isFav, setIsFav] = useState<boolean>(false);
    const [recipe, setRecipe] = useState<iRecipe | undefined>(undefined);
    const [open, setOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [isOwner, setIsOwner] = useState<boolean>(false);

    useEffect(() => {
        const recipe = recipeItems.find(r => r._id === id);
        const base = process.env.REACT_APP_SHARE_URL;

        if (recipe) {
            setRecipe(recipe);
            setValue(`${base}/recipes/${recipe._id}`)
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
                        </React.Fragment>
                    )
                }

                <CopyToClipboard
                    onCopy={() => setCopied(true)}
                    text={value}
                >
                    <StyledButton title={copied ? `Copied URL` : 'Share'} >
                        <StyledShareIcon />
                    </StyledButton>

                </CopyToClipboard>
                <UserActionButtonIcon title="Print" clickHandler={() => window.print()} icon={ButtonIconTypeEnum.print} />
            </StyledRecipeActionBar>
            <ConfirmDialog
                open={open}
                title={"Are you sure?"}
                confirmText={`Delete ${recipe?.r_name} recipe?`}
                handleCancel={handleClose}
                handleConfirm={handleDelete}
            />
            <StyledTextarea
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    setCopied(false);
                }}
            />
        </React.Fragment>
    );
}

export default RecicipeActionBar;
