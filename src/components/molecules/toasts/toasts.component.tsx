import React, { FC } from 'react';
import { ToastProvider, ToastProps } from 'react-toast-notifications';
import { StyledToast, StyledButton, StyledCloseIcon } from './toasts-styles'





const CustomToasts: FC<ToastProps> = ({ children, appearance, onDismiss, ...props }) => (
    <StyledToast Appearance={appearance}>
        <div>{children}</div>
        <StyledButton onClick={(id) => onDismiss()}>
            <StyledCloseIcon />
        </StyledButton>
    </StyledToast>
);

export default CustomToasts;