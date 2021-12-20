import styled from 'styled-components';
import { Delete, Edit, Share, Print } from '@material-ui/icons';

export const StyledTextarea = styled.textarea`
    width: 1px;
    height: 1px;
    margin: 0;
    visibility: hidden;
`;

export const StyledEditIcon = styled(Edit)`
    font-size: 1.5rem !important;
`;

export const StyledDeleteIcon = styled(Delete)`
    font-size: 1.5rem !important;
`;

export const StyledShareIcon = styled(Share)`
    font-size: 1.5rem !important;
`;

export const StyledPrintIcon = styled(Print)`
    font-size: 1.5rem !important;
`;

export const StyledRecipeActionBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const StyledButton = styled.button`
    opacity: 0.5;
    border: 0;
    padding: 0;
    display: flex;
    align-items: center;
    transition: opacity ease-in-out 300ms;
    cursor: pointer;
    background-color: transparent;
    color: ${props => props.theme.colors.pageLinkColor1};
    margin: 0 1rem 0 0;
    &:last-child {
        margin: 0;
    }
    &:hover {
        transition: opacity ease-in-out 300ms;
        opacity: 1;
    }
`;