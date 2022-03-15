import React, { FC } from 'react';

import { StyledPrimaryButton } from './form-button.styles';

export enum FormButtons {
    Primary = "Primary",
    Secondary = "Secondary"
}

interface Props {
    buttonText: string;
    type: 'button' | 'submit';
    FormButton: FormButtons;
    onClick?: () => void;
    disabled?: boolean;
    size?: 'small' | undefined;
}



const FormButton: FC<Props> = ({ buttonText, type = 'button', FormButton, onClick, disabled = false, size }) => {
    return (
        <StyledPrimaryButton
            Size={size}
            onClick={onClick}
            FormButton={FormButton}
            type={type}
            disabled={disabled}
        >
            {buttonText}
        </StyledPrimaryButton>
    )
}

export default FormButton;