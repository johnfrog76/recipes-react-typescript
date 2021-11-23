import styled from 'styled-components';
import { Dialog } from '@material-ui/core';


export const StyledConfirmButton = styled.button`
    color: #fff;
    border: 0;
    background-color: ${props => props.theme.colors.navBarBackground};
    cursor: pointer;
    padding: 0.25rem 0.5rem;
`;

export const StyledCancelButton = styled.button`
    color: ${props => props.theme.colors.pageForeground1};
    border: 0;
    background-color: ${props => props.theme.colors.pageBackground3};
    cursor: pointer;
    padding: 0.25rem 0.5rem;
`;

export const StyledDialog = styled(Dialog)`
    .MuiPaper-root {
        border: 1px solid ${props => props.theme.colors.pageBorderColor1};
        border-radius: 0px;
        background-color: ${props => props.theme.colors.pageBackground1};
        color: ${props => props.theme.colors.pageHighLight2}
    }
    
    .MuiDialogContentText-root {
        
        color: ${props => props.theme.colors.pageForeground1};
    }
`;
