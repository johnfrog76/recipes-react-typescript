import React from 'react';
import { Link } from 'react-router-dom';

import { StyledNavBrand } from './nav-brand.styles';

const NavBrand = ({ }) => (
    <React.Fragment>
        <Link to='/'>
            <StyledNavBrand />
        </Link>
    </React.Fragment>
)

export default NavBrand;