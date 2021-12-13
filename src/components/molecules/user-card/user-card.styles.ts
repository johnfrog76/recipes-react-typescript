import styled from 'styled-components';

import {NavLink} from 'react-router-dom';

export const StyledUserCard = styled.div`
    display: flex;
    padding: 1rem;
    border: 2px solid ${props => props.theme.colors.pageBorderColor1};
`;

export const StyledNoSharedRecipes = styled.div`
    color: ${props => props.theme.colors.pageBorderColor1};
`;

export const StyledNavLink = styled(NavLink)`
    color: ${props => props.theme.colors.pageLinkColor1};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;
