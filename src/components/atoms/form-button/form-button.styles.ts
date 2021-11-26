import styled from 'styled-components';

import {FormButtons } from './form-button.component';


interface iButtonStyleProps {
    FormButton: FormButtons
}

export const StyledPrimaryButton = styled.button<iButtonStyleProps>`
    margin: 0 0 1rem 0;
    width: 100%;

    @media (min-width: 414px) {
        margin: 0 0 0 0;
        margin-right: ${props => props.FormButton === FormButtons.Primary ? '1rem' : 0 };
        width: auto;
    }
    font-size: ${props => props.theme.fontSizes.regular};
    background-color: ${props => props.FormButton === FormButtons.Primary ?
        props.theme.colors.navBarBackground : props.theme.colors.pageBackground3};
    border: 0;
    padding: 0.5rem 1rem;
    color: ${props => props.FormButton === FormButtons.Primary ?
        '#fff' : props.theme.colors.pageForeground1};
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