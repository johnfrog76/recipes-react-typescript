
import React, { useContext, useEffect, useState } from "react";

import NAV_DATA from './primary-nav.data.json';
import NavBrand from '../../atoms/nav-brand/nav-brand-component';
import ThemeSwitcher from "../theme-switcher/theme-switcher.component";
import SignInSignOut from "../sign-in-out/sign-in-out.component";
import { UserContext } from "../../../providers/user/user.provider";
import CloseButton from "../../atoms/close-button/close-button.component";
import MenuToggle from "../../atoms/menu-toggle/menu-toggle.component";
import {
    StyledNavUl,
    StyledMenuHeader,
    StyledNavBrandWrap,
    StyledNavLink,
    StyledNavBar,
    StyledBackdrop,
    StyledListItem,
    StyledMenuOuter,
} from './primary.nav.styles';

interface iMainNavItem {
    text: string;
    route: string;
    auth: boolean;
}

const PrimaryNav = () => {
    const [mainNavItems, setMainNavItems] = useState<iMainNavItem[]>(NAV_DATA);
    const { isLoggedIn } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if (!isLoggedIn) {
            setMainNavItems(mainNavItems.filter(item => item.auth === false));
        } else {
            setMainNavItems(NAV_DATA);
        }
    }, [isLoggedIn])


    return (
        <StyledNavBar>

            <StyledNavBrandWrap>
                <MenuToggle toggleHandler={handleIsOpen} />
                <NavBrand isOpen={isOpen} toggleClose={handleIsOpen} />
            </StyledNavBrandWrap>

            <StyledMenuOuter isOpen={isOpen}>
                <div>
                    <StyledMenuHeader>
                        <NavBrand isOpen={isOpen} toggleClose={handleIsOpen} />
                        <CloseButton closeHandler={handleIsOpen} />
                    </StyledMenuHeader>
                    <StyledNavUl>
                        {
                            mainNavItems.map((item, idx) => (
                                <StyledListItem key={`item${idx}`} onClick={() => handleIsOpen()}>
                                    <StyledNavLink to={item.route}>{item.text}</StyledNavLink>
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
            <StyledBackdrop isOpen={isOpen} onClick={() => handleIsOpen()} />

            <SignInSignOut isLoggedIn={isLoggedIn} />

        </StyledNavBar>
    );
}

export default PrimaryNav;