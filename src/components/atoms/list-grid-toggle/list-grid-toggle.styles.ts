import styled from 'styled-components';

import {GridOn, List} from '@material-ui/icons';

export const StyledButton = styled.button`
    display: flex;
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
`;

export const StyledGridOnIcon = styled(GridOn)`
    color: ${props => props.theme.colors.pageHighLight2};
`

export const StyledListIcon = styled(List)`
    color: ${props => props.theme.colors.pageHighLight2};
`
