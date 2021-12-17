import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { StyledNavBrand } from './nav-brand.styles';

interface Props {
    toggleClose: () => void;
    isOpen: boolean;
}

const NavBrand: FC<Props> = ({ toggleClose, isOpen }) => {
    const handleClose = () => {
        if (isOpen) {
            toggleClose();
        }
    };

    return (
        <React.Fragment>
            <Link onClick={() => handleClose()} to='/'>
                <StyledNavBrand />
            </Link>
        </React.Fragment>
    )
}


export default NavBrand;