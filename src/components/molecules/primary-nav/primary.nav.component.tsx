
import React from "react";
import { NavLink } from "react-router-dom";

import { StyledNavUl, StyledNavBar, StyledListItem } from './primary.nav.styles';
import NavBrand from '../../atoms/nav-brand/nav-brand-component';
import ThemeSwitcher from "../theme-switcher/theme-switcher.component";

const PrimaryNav = () => {

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
            <ThemeSwitcher />
        </StyledNavBar>
    );
}

export default PrimaryNav;