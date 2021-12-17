import styled from 'styled-components';

import { NavLink } from "react-router-dom";

interface iStyledMenuOuter {
    isOpen: boolean;
}

export const StyledNavUl = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0;
    padding: 0;
`;

export const StyledNavBrandWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    > a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #fff;
    }
`;

export const StyledMenuHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    min-height: 55px;
    > a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: ${props => props.theme.colors.pageForeground1};
    }
`;

export const StyledNavLink = styled(NavLink)`
    color: ${props => props.theme.colors.pageLinkColor1};
    padding: 1.5rem;
    text-decoration: none;
    min-width: 100%;
    display: inline-block;
    &.active {
        background-color: ${props => props.theme.colors.pageBackground2};
    }
`

export const StyledListItem = styled.li`
    margin: 0;
    padding: 0;
    width: 100%;
    background-color: ${props => props.theme.colors.pageBackground1};
`;

export const StyledMenuOuter = styled.div<iStyledMenuOuter>`
    background-color: ${props => props.theme.colors.pageBackground1};
    position: fixed;
    top: 0;
    left: ${props => props.isOpen ? '0px' : '-300px' };
    width: 300px;
    height: 100vh;
    border-right: 1px solid ${props => props.theme.colors.pageBorderColor1};
    z-index: 20;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: left 300ms ease-in-out;
`;

export const StyledNavBar = styled.div`
    height: 55px;
    max-width: 100vw;
    background-color: ${(props) => props.theme.colors.navBarBackground};
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
`;