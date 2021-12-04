
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { StyledNavUl, StyledNavBar, StyledListItem, StyledRightItemsWrapper } from './primary.nav.styles';
import NavBrand from '../../atoms/nav-brand/nav-brand-component';
import ThemeSwitcher from "../theme-switcher/theme-switcher.component";
import SignOutButton from "../../atoms/sign-out/sign-out.component";
import { UserContext } from "../../../providers/user/user.provider";

const PrimaryNav = () => {

    const { isLoggedIn } = useContext(UserContext);

    return (
        <StyledNavBar>
            <NavBrand />
            <StyledNavUl>
                <StyledListItem>
                    <NavLink className={isActive => isActive ? 'active' : ''} to="/recipes">recipes</NavLink>
                </StyledListItem>
                <StyledListItem>
                    <NavLink className={isActive => isActive ? 'active' : ''} to="/add-recipe">add-recipe</NavLink>
                </StyledListItem>
            </StyledNavUl>
            <StyledRightItemsWrapper>
                <StyledListItem>
                    {
                        isLoggedIn ?
                            (
                                <SignOutButton />
                            )
                            :
                            (
                                <NavLink className={isActive => isActive ? 'active' : ''} to="/sign-in">sign in</NavLink>
                            )
                    }
                </StyledListItem>
                <ThemeSwitcher />
            </StyledRightItemsWrapper>
        </StyledNavBar>
    );
}

export default PrimaryNav;