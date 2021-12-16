import styled from 'styled-components';

import { NavLink } from "react-router-dom";
import {Home, PeopleAlt, MenuBook, Widgets, AddCircle, Settings} from '@material-ui/icons';
import { getThemeProps } from '@material-ui/styles';

interface iStyledMenuOuter {
    isOpen: boolean;
}

const common = (props: any) => `
    color: ${props.theme.colors.navBarBackground};
    font-size: 1.75rem !important;
    margin-right: 1rem;
`

export const StyledHome = styled(Home)`
    ${props => common(props)}
`;

export const StyledUsers = styled(PeopleAlt)`
    ${props => common(props)}
`;

export const StyledMenu = styled(MenuBook)`
    ${props => common(props)}
`;

export const StyledWidget = styled(Widgets)`
    ${props => common(props)}
`;

export const StyledAddCircle = styled(AddCircle)`
    ${props => common(props)}
`;

export const StyledSetting = styled(Settings)`
    ${props => common(props)}
`;

export const StyledNavUl = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0;
    padding: 0;
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
    display: flex;
    align-items: center;
    font-size: inherit;
    &.active {
        background-color: ${props => props.theme.colors.pageBackground2};
    }
`

export const StyledListItem = styled.li`
    margin: 0;
    padding: 0;
    width: 100%;
    font-size: ${props => props.theme.fontSizes.smallPlus};
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

