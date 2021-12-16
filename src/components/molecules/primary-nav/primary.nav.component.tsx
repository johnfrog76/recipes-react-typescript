
import React, { useContext, useEffect, useState } from "react";

import NAV_DATA from './primary-nav.data.json';
import NavBrand from '../../atoms/nav-brand/nav-brand-component';
import SignInSignOut from "../sign-in-out/sign-in-out.component";
import { AuthContext } from "../../../providers/auth/auth.provider";
import Backdrop from "../../atoms/backdrop/backdrop.component";
import MenuToggle from "../../atoms/menu-toggle/menu-toggle.component";
import MainMenu from "../main-menu/main-menu.component";
import { iMainNavItem } from "../../../interfaces/nav/nav.interface";
import { StyledNavBrandWrap, StyledNavBar } from './primary.nav.styles';

const PrimaryNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mainNavItems, setMainNavItems] = useState<iMainNavItem[]>(NAV_DATA);
    const { isLoggedIn, useAuth, getUserAuth, setLogin,
        setUserToken, setUserObject, setUserExpiration } = useContext(AuthContext);

    const handleIsOpen = () => {
        setIsOpen(!isOpen);
        if (isLoggedIn) {
            useAuth();
            if (getUserAuth() === null) {
                setUserObject(null);
                setLogin(false);
                setUserToken(null);
                setUserExpiration(null);
            }
        }
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
            <MainMenu isOpen={isOpen} toggleIsOpen={handleIsOpen} items={mainNavItems} />
            <Backdrop isOpen={isOpen} toggleClose={() => handleIsOpen()} />
            <SignInSignOut isLoggedIn={isLoggedIn} />
        </StyledNavBar>
    );
}

export default PrimaryNav;