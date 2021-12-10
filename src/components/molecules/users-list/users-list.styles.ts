import styled from 'styled-components';

import {NavLink} from 'react-router-dom';

export const StyledUserCard = styled.div`
    display: flex;
    padding: 1rem;
    border: 2px solid ${props => props.theme.colors.pageBorderColor1};
`;

export const StyledUserCardList = styled.ul`
    width: 100%;
    margin: 1.5em 0 0 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80vw, 1fr));
    @media (min-width: 991px) {
        grid-template-columns: repeat(auto-fit, minmax(23.75rem, 1fr));
    }
    grid-gap: 1.2rem;
    overflow: hidden;
    color: ${props => props.theme.colors.pageForeground1};
`;

export const StyledNavLink = styled(NavLink)`
    color: ${props => props.theme.colors.pageLinkColor1};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;
