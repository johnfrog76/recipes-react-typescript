
import React, { useContext, useEffect, useState } from "react";

import NAV_DATA from './primary-nav.data.json';
import NavBrand from '../../atoms/nav-brand/nav-brand-component';
import SignInSignOut from "../sign-in-out/sign-in-out.component";
import { UserContext } from "../../../providers/user/user.provider";
import Backdrop from "../../atoms/backdrop/backdrop.component";
import MenuToggle from "../../atoms/menu-toggle/menu-toggle.component";
import MainMenu from "../main-menu/main-menu.component";
import { iMainNavItem } from "../../../interfaces/nav/nav.interface";
import { StyledNavBrandWrap, StyledNavBar } from './primary.nav.styles';

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

            <MainMenu isOpen={isOpen} toggleIsOpen={handleIsOpen} items={mainNavItems} />
            <Backdrop isOpen={isOpen} toggleClose={() => handleIsOpen()} />

            <SignInSignOut isLoggedIn={isLoggedIn} />

        </StyledNavBar>
    );
}

export default PrimaryNav;