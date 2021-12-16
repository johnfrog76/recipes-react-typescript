import React, { FC, useContext } from 'react';
import { iMainNavItem } from '../../../interfaces/nav/nav.interface';
import NavBrand from '../../atoms/nav-brand/nav-brand-component';
import CloseButton from '../../atoms/close-button/close-button.component';
import ThemeSwitcher from '../theme-switcher/theme-switcher.component';
import { AuthContext } from '../../../providers/auth/auth.provider';
import {
    StyledMenuOuter,
    StyledMenuHeader,
    StyledNavUl,
    StyledListItem,
    StyledNavLink,
    StyledHome, StyledUsers, StyledMenu, StyledWidget, StyledSetting, StyledAddCircle
} from './main-menu.styles';
import { JsxElement } from 'typescript';

type Props = {
    isOpen: boolean;
    toggleIsOpen: () => void;
    items: iMainNavItem[];
    isLoggedIn: boolean;
}

type itemsWithIconsType = {
    text: string;
    route: string;
    auth: boolean;
    params?: string;
    icon: JsxElement | null
}

const MainMenu: FC<Props> = ({ isOpen, toggleIsOpen, items, isLoggedIn }) => {
    const { user } = useContext(AuthContext);
    const icons = isLoggedIn ? [
        StyledHome,
        StyledUsers,
        StyledMenu,
        StyledWidget,
        StyledAddCircle,
        StyledSetting
    ] : [
        StyledHome,
        StyledUsers,
        StyledMenu,
        StyledSetting
    ]
    const itemsWithIcons = items.map((i, idx) => {
        const icon = icons[idx] ? icons[idx] : null
        return {
            ...i,
            icon: icon
        }
    });

    return (
        <StyledMenuOuter isOpen={isOpen}>
            <div>
                <StyledMenuHeader>
                    <NavBrand isOpen={isOpen} toggleClose={toggleIsOpen} />
                    <CloseButton closeHandler={toggleIsOpen} />
                </StyledMenuHeader>
                <StyledNavUl>
                    {
                        itemsWithIcons.map((item, idx) => (
                            <StyledListItem key={`item${idx}`} onClick={() => toggleIsOpen()}>
                                <StyledNavLink to={
                                    item.params ? `${item.route}/${user?.userId}` : item.route
                                }>
                                    {item.icon !== null && <item.icon />}
                                    {item.text}
                                </StyledNavLink>
                            </StyledListItem>
                        ))
                    }
                </StyledNavUl>
            </div>
            <StyledNavUl>
                <StyledListItem>
                    <ThemeSwitcher />
                </StyledListItem>
            </StyledNavUl>
        </StyledMenuOuter>
    );
}

export default MainMenu;