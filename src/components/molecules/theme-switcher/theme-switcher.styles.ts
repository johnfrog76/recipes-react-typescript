import styled from 'styled-components';

import { DarkMode, LightMode } from '@mui/icons-material';

interface iButtonProps {
    Settings: boolean;
} 

export const StyledThemeButton = styled.button<iButtonProps>`
    background-color: transparent;
    border: 0;
    padding: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: inherit;
    min-width: 100%;
    padding: 1.5rem;
    color: ${props => props.theme.colors.pageLinkColor1};
    ${props => props.Settings === true && `
        background-color: ${props.theme.colors.navBarBackground};
        color: #fff;
        justify-content: center;
        margin-top: 1.5rem;
        padding: 0.75rem 1.5rem;
        font-size: ${props.theme.fontSizes.smallPlus};
        > span {
            margin-left: -0.25rem;
        }
    `}
`;

export const StyledLightModeIcon = styled(LightMode)`
    font-size: 2rem !important;
    margin-right: 1rem;
`;

export const StyledDarkModeIcon = styled(DarkMode)`
    font-size: 2rem !important;
    margin-right: 1rem;
`;