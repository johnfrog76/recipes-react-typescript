import React from 'react';
import styled from 'styled-components';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface iStyledLabel {
    Required: boolean;
}

export const StyledVisibility = styled(Visibility)`
    color: ${props => props.theme.colors.pageForeground1};
    font-size: 1.2rem !important;
`;

export const StyledVisibilityOff = styled(VisibilityOff)`
    color: ${props => props.theme.colors.pageForeground1};
    font-size: 1.2rem !important;
`;

export const StyledEyeButton = styled.button`
    background-color: transparent;
    display: flex;
    align-items: center;
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
`

export const StyledInput = styled.input`
    border: 2px solid ${props => props.theme.colors.pageBorderColor1};
    color: ${props => props.theme.colors.pageForeground1};
    background-color: ${props => props.theme.colors.pageBackground1};
    width: 100%;
    font-size: 1rem;
    height: 2.5rem;
    padding: .25rem .5rem;
    &:focus {
        border: 2px solid ${props => props.theme.colors.navBarBackground};
        outline: 0;
    }
`;

export const StyledLabel = styled.label<iStyledLabel>`
    color: ${props => props.theme.colors.pageForeground1};
    display: block;
    margin-bottom: 0.25rem;
    &::before {
        content: '${props => props.Required ? '*' : ''}';
        color: ${props => props.theme.colors.pageHighLight2};
        font-size: 18px;
        font-weight: 700;
        padding-right: 0.3rem;
    }
`;

export const StyledEyeLabel = styled(StyledLabel)`
    display: flex;
    align-items: center;
    > span {
        margin-right: 0.5rem;
    }
`;
