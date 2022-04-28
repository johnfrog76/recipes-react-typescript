
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    let logoutTimer: ReturnType<typeof setTimeout>;
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [mainNavItems, setMainNavItems] = useState<iMainNavItem[]>(NAV_DATA);
    const { isLoggedIn, expireAuth, setLogin,
        setUserToken, setUserObject, setUserExpiration, getRemainingTime } = useContext(AuthContext);

    const logout = useCallback(() => {
        expireAuth();
        setUserObject(null);
        setLogin(false);
        setUserToken(null);
        setUserExpiration(null);
        localStorage.removeItem('userData');
        navigate('/');
    }, []);

    const handleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if (!isLoggedIn) {
            setMainNavItems(mainNavItems.filter(item => item.auth === false));
            clearTimeout(logoutTimer);
        } else {
            setMainNavItems(NAV_DATA);
            setTimeout(() => {
                let timeLeft = getRemainingTime();
                let mins = (timeLeft / (60 * 1000)).toFixed();
                console.log(`${mins} minutes remaining in session`);
                logoutTimer = setTimeout(logout, timeLeft);
            });
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