import styled from 'styled-components';
import {Close} from '@material-ui/icons';

interface iStyledToast {
    Appearance: string;
}

export const StyledCloseIcon = styled(Close)`
cursor: pointer;
font-size: 1rem !important;
`;

export const StyledButton = styled.button`
    background-color: transparent;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
`;

export const StyledToast = styled.div<iStyledToast>`
    background: ${props => props.Appearance === 'success' ?
        props.theme.colors.pageToastSuccess :
        props.theme.colors.pageToastError};
    position: fixed;
    top: 55px;
    left: 45%;
    padding: 0.75rem 2.5rem;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
`;
