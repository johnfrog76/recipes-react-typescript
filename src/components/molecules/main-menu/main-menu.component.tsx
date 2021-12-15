import React, { FC, useContext } from 'react';
import { iMainNavItem } from '../../../interfaces/nav/nav.interface';
import NavBrand from '../../atoms/nav-brand/nav-brand-component';
import CloseButton from '../../atoms/close-button/close-button.component';
import ThemeSwitcher from '../theme-switcher/theme-switcher.component';
import ThemePalletSwitcher from '../theme-palette-switcher/theme-palette-switcher.component';
import { AuthContext } from '../../../providers/auth/auth.provider';
import {
    StyledMenuOuter,
    StyledMenuHeader,
    StyledNavUl,
    StyledListItem,
    StyledNavLink
} from './main-menu.styles';

type Props = {
    isOpen: boolean;
    toggleIsOpen: () => void;
    items: iMainNavItem[];
}

const MainMenu: FC<Props> = ({ isOpen, toggleIsOpen, items }) => {
    const { user } = useContext(AuthContext);

    return (
        <StyledMenuOuter isOpen={isOpen}>
            <div>
                <StyledMenuHeader>
                    <NavBrand isOpen={isOpen} toggleClose={toggleIsOpen} />
                    <CloseButton closeHandler={toggleIsOpen} />
                </StyledMenuHeader>
                <StyledNavUl>
                    {
                        items.map((item, idx) => (
                            <StyledListItem key={`item${idx}`} onClick={() => toggleIsOpen()}>
                                <StyledNavLink to={
                                    item.params ? `${item.route}/${user?.userId}` : item.route
                                }>{item.text}</StyledNavLink>
                            </StyledListItem>
                        ))
                    }
                </StyledNavUl>
            </div>
            <StyledNavUl>
                <StyledListItem>
                    <ThemePalletSwitcher />
                    <ThemeSwitcher />
                </StyledListItem>
            </StyledNavUl>
        </StyledMenuOuter>
    );
}

export default MainMenu;