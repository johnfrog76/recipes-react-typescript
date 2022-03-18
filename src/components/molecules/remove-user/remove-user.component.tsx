import React, { FC, useState, useContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import { StyledFormWrapper, StyledUnderlabel } from './remove-user.styles';
import ConfirmDialog from '../../molecules/confirm-dialog/confirm-dialog.component';

import { deleteUserAccount } from '../../../services/users/users.service';
import AccordionToggle from '../../atoms/accordion-toggle/accordion-toggle.component';
import FormButton, { FormButtons } from '../../atoms/form-button/form-button.component';
import { AuthContext } from '../../../providers/auth/auth.provider';
import { UsersContext } from '../../../providers/users/users.provider';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';

const RemoveUserComponent = () => {
    const { addToast } = useToasts();
    const { user, isLoggedIn, expireAuth, getUserAuth, setLogin,
        setUserToken, setUserObject, setUserExpiration } = useContext(AuthContext);
    const { userCount, userItems, removeUserItem } = useContext(UsersContext);
    const { makeRequest, makeFreshPull } = useContext(RecipesContext);
    const [showForm, setShowForm] = useState(false);
    const [open, setOpen] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    const handleDelete = () => {
        if (user) {
            deleteUserAccount(user).then((resp) => {
                setOpen(false);
                let userToRemove = userItems.find(u => u.id === user.userId);
                if (userToRemove) {
                    removeUserItem(userToRemove, userItems)
                }
                addToast(
                    'Success',
                    {
                        appearance: 'success',
                        autoDismiss: true
                    }
                );
                localStorage.removeItem('userData');
                expireAuth();
                setUserObject(null);
                setLogin(false);
                setUserToken(null);
                setUserExpiration(null);
                makeFreshPull(true)

            }).catch((err) => {
                setOpen(false);
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

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <React.Fragment>
            {
                user && (
                    <div>
                        {
                            <AccordionToggle
                                isOpen={showForm}
                                toggleHandler={() => toggleForm()}
                                buttonText="Account Settings"
                            />
                        }
                        {
                            showForm && (
                                <StyledFormWrapper>
                                    <StyledUnderlabel>Close account and remove data</StyledUnderlabel>
                                    <FormButton
                                        FormButton={FormButtons.Secondary}
                                        buttonText="Remove Account"
                                        type="button"
                                        onClick={() => { setOpen(true); }}
                                        disabled={false}
                                        size="small"
                                    ></FormButton>
                                    <ConfirmDialog
                                        open={open}
                                        title={"Are you sure?"}
                                        confirmText={`Delete my account and data? This action cannot be undone.`}
                                        handleCancel={handleClose}
                                        handleConfirm={handleDelete}
                                    />
                                </StyledFormWrapper>
                            )
                        }
                    </div>
                )
            }
        </React.Fragment>
    )
};

export default RemoveUserComponent;