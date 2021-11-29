import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useToasts } from 'react-toast-notifications';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import ConfirmDialog from '../../molecules/confirm-dialog/confirm-dialog.component';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';
import { removeRecipe } from '../../../services/recipes/recipes.services';

import {
    StyledDeleteIcon,
    StyledEditIcon,
    StyledPrintIcon,
    StyledShareIcon,
    StyledRecipeActionBar,
    StyledButton,
    StyledTextarea
} from './recipe-action-bar.styles';

const RecicipeActionBar = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const { addToast } = useToasts();
    const { recipeItems, deleteRecipe, isLoading, setSpinner, setCount } = useContext(RecipesContext);

    const [recipe, setRecipe] = useState<iRecipe | undefined>(undefined);
    const [open, setOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    const handleDelete = () => {
        if (recipe) {
            setOpen(false);
            setSpinner(true);
            removeRecipe(recipe).then((resp) => {
                // delay see spinner in the parent component
                setTimeout(() => {
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
                }, 2000)
            }).catch((err) => {
                setOpen(false);
                addToast(
                    `Error: ${err.message}`,
                    {
                        appearance: 'error',
                        autoDismiss: false
                    }
                );
            })
        }
    }

    useEffect(() => {
        const recipe = recipeItems.find(r => r._id === id);
        if (recipe) {
            setRecipe(recipe);
            setValue(`localhost:3000/recipes/${recipe._id}`)
        }
    }, [recipeItems]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <StyledRecipeActionBar>
                <StyledButton title="Delete" onClick={() => handleClickOpen()}>
                    <StyledDeleteIcon />
                </StyledButton>

                <StyledButton title="Edit" onClick={() => navigate(`/edit-recipe/${id}`)}>
                    <StyledEditIcon />
                </StyledButton>

                <CopyToClipboard
                    onCopy={() => setCopied(true)}
                    text={value}
                >
                    <StyledButton title={copied ? `copied url` : 'Share'}>
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
