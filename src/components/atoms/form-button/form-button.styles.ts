import styled from 'styled-components';

import {FormButtons } from './form-button.component';


interface iButtonStyleProps {
    FormButton: FormButtons
}

export const StyledPrimaryButton = styled.button<iButtonStyleProps>`
    font-size: ${props => props.theme.fontSizes.regular};
    background-color: ${props => props.FormButton === FormButtons.Primary ?
        props.theme.colors.navBarBackground : props.theme.colors.pageBackground3};
    margin: 0 0 0 0;
    margin-right: ${props => props.FormButton === FormButtons.Primary ? '1rem' : 0 };
    border: 0;
    padding: 0.5rem 1rem;
    color: #fff;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.FormButton === FormButtons.Primary ?
            props.theme.colors.pageHighLight2 : props.theme.colors.pageBorderColor1};
    }
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        &:hover {
            background-color: ${props => props.FormButton === FormButtons.Primary ?
                props.theme.colors.navBarBackground : props.theme.colors.pageBackground3};
        }
    }
`;