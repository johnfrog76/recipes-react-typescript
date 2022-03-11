import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useToasts } from 'react-toast-notifications';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import { UsersContext } from '../../../providers/users/users.provider';
import { AuthContext } from '../../../providers/auth/auth.provider';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';
import { iUserItem } from '../../../interfaces/users/users.interface';
import { removeRecipe, addFavorite, removeFavorite } from '../../../services/recipes/recipes.services';
import ConfirmDialog from '../../molecules/confirm-dialog/confirm-dialog.component';

import {
    StyledDeleteIcon,
    StyledEditIcon,
    StyledPrintIcon,
    StyledShareIcon,
    StyledRecipeActionBar,
    StyledButton,
    StyledTextarea,
    StyledFavoriteOutlineIcon,
    StyledFavoriteIcon
} from './recipe-action-bar.styles';

const RecicipeActionBar = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const { addToast } = useToasts();
    const { recipeItems, deleteRecipe, setSpinner, setCount } = useContext(RecipesContext);
    const { token, isLoggedIn, user } = useContext(AuthContext);
    const { userItems } = useContext(UsersContext);

    const [favDisabled, setFavDisabled] = useState<boolean>(false);
    const [isFav, setIsFav] = useState<boolean>(false);
    const [recipe, setRecipe] = useState<iRecipe | undefined>(undefined);
    const [open, setOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [isOwner, setIsOwner] = useState<boolean>(false);

    useEffect(() => {
        const recipe = recipeItems.find(r => r._id === id);
        const base = process.env.REACT_APP_BASEURL;

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
        const tempUser: iUserItem | undefined = userItems.find(u => u._id === user?.userId);
        if (tempUser?.favorites) {
            const tempFav = tempUser?.favorites.find(fav => fav.id === id);
            if (tempFav) {
                setIsFav(true)
            }
        }
    }, [userItems, user, id]);

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
                if (resp.message === 'favorite removed') {
                    setIsFav(false);
                }
                setFavDisabled(false);
            });
        } else {
            addFavorite(id, user?.userId, token).then((resp) => {
                if (resp.message === 'favorite added') {
                    setIsFav(true);
                }
                setFavDisabled(false);
            });
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
                                    <StyledButton title="Remove Favorite" disabled={favDisabled} onClick={() => handleFavorite()}>
                                        <StyledFavoriteIcon />
                                    </StyledButton>
                                ) : (
                                    <StyledButton title="Add Favorite" disabled={favDisabled} onClick={() => handleFavorite()}>
                                        <StyledFavoriteOutlineIcon />
                                    </StyledButton>
                                )
                            }
                            {
                                isOwner && (
                                    <React.Fragment>
                                        <StyledButton title="Delete" onClick={() => handleClickOpen()}>
                                            <StyledDeleteIcon />
                                        </StyledButton>

                                        <StyledButton title="Edit" onClick={() => navigate(`/edit-recipe/${id}`)}>
                                            <StyledEditIcon />
                                        </StyledButton>
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
                    <StyledButton title={copied ? `Copied URL` : 'Share'}>
                        <StyledShareIcon />
                    </StyledButton>
                </CopyToClipboard>

                <StyledButton title="Print" onClick={() => window.print()}>
                    <StyledPrintIcon />
                </StyledButton>
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
