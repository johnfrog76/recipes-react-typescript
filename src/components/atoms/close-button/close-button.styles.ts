import styled from 'styled-components';
import Close from '@material-ui/icons/Close'


export const StyledClose = styled(Close)`
    color: ${props => props.theme.colors.pageLinkColor1};
    font-size: 2rem !important;
`;

export const StyledButton = styled.button`
    padding: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
`;