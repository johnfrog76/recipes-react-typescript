import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
    color: ${props => props.theme.colors.pageLinkColor1};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const StyledSignUpContainer = styled.p`
    margin: 1rem 0;
    color: ${props => props.theme.colors.pageForeground1};
`;