import React from 'react';
import { Link } from 'react-router-dom';

import { StyledNavBrand, StyledNavBrandWrap, StyledBrandText } from './nav-brand.styles';

const NavBrand = () => (
    <StyledNavBrandWrap>
        <Link to='/'>
            <StyledNavBrand />
            <StyledBrandText>Recipes</StyledBrandText>
        </Link>
    </StyledNavBrandWrap>
)

export default NavBrand;