
import React, { useContext, useState } from "react";


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
import NavBrand from '../../atoms/nav-brand/nav-brand-component';
import ThemeSwitcher from "../theme-switcher/theme-switcher.component";
import SignInSignOut from "../sign-in-out/sign-in-out.component";
import { UserContext } from "../../../providers/user/user.provider";
import CloseButton from "../../atoms/close-button/close-button.component";
import MenuToggle from "../../atoms/menu-toggle/menu-toggle.component";

interface iMainNavItem {
    text: string;
    route: string;
}

const PrimaryNav = () => {

    const { isLoggedIn } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    const authItems: iMainNavItem[] = [
        {
            text: 'add recipe',
            route: '/add-recipe'
        },
        {
            text: 'my recipes',
            route: '/my-recipes'
        }
    ];
    let mainNavItems: iMainNavItem[] = [{
        text: 'home',
        route: '/'
    }, {
        text: 'users',
        route: '/users'
    }, {
        text: 'recipes',
        route: '/recipes'
    }];

    if (isLoggedIn) {
        mainNavItems = mainNavItems.concat(authItems);
    }

    return (
        <StyledNavBar>
            <StyledNavBrandWrap>
                <MenuToggle toggleHandler={handleIsOpen} />
                <NavBrand />
            </StyledNavBrandWrap>
            <StyledBackdrop isOpen={isOpen} onClick={() => handleIsOpen()} />
            <StyledMenuOuter isOpen={isOpen}>
                <div>
                    <StyledMenuHeader>
                        <NavBrand />
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
            <SignInSignOut isLoggedIn={isLoggedIn} />
        </StyledNavBar>
    );
}

export default PrimaryNav;