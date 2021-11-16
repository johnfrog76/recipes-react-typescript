import React from 'react';
import { Link } from 'react-router-dom';

import { StyledNavBrand, StyledNavBrandWrap } from './nav-brand.styles';

const NavBrand = () => (
    <StyledNavBrandWrap>
        <Link to='/'>
            <StyledNavBrand />
            <span>Recipes</span>
        </Link>
    </StyledNavBrandWrap>
)

export default NavBrand;