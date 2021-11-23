import React, { FC } from 'react';

import { DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';

import { StyledDialog, StyledCancelButton, StyledConfirmButton } from './confirm-dialog.styles';

interface Props {
    title: string;
    confirmText: string;
    open: boolean;
    handleCancel: () => void;
    handleConfirm: () => void;
}

export const ConfirmDialog: FC<Props> = ({ title, confirmText, handleCancel, handleConfirm, open }) => {
    return (
        <StyledDialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {confirmText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <StyledCancelButton onClick={handleCancel}>No</StyledCancelButton>
                <StyledConfirmButton onClick={handleConfirm} autoFocus>Yes</StyledConfirmButton>
            </DialogActions>
        </StyledDialog>
    );
}

export default ConfirmDialog;
