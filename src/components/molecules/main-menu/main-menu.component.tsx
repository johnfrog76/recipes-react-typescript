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
    StyledFavorite,
    StyledHome, StyledUsers, StyledMenu, StyledWidget, StyledSetting, StyledAddCircle, StyledNotifications
} from './main-menu.styles';

type Props = {
    isOpen: boolean;
    toggleIsOpen: () => void;
    items: iMainNavItem[];
}

export enum Icons {
    home = 0,
    users = 1,
    list = 2,
    my = 3,
    add = 4,
    settings = 5,
    favorite = 6,
    notification = 7
}

const returnIconsByKey = (id: Icons) => {
    const map = {
        "0": StyledHome,
        "1": StyledUsers,
        "2": StyledMenu,
        "3": StyledWidget,
        "4": StyledAddCircle,
        "5": StyledSetting,
        "6": StyledFavorite,
        "7": StyledNotifications
    };
    return map[id] || null;
}

const MainMenu: FC<Props> = ({ isOpen, toggleIsOpen, items }) => {
    const { user } = useContext(AuthContext);

    const itemsWithIcons = items.map((i, idx) => {
        return {
            ...i,
            icon: returnIconsByKey(i.svgIcon)
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