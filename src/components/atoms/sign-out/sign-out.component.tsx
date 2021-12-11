import React, { useContext, useState } from 'react';

import { AuthContext } from '../../../providers/auth/auth.provider';
import Backdrop from '../../atoms/backdrop/backdrop.component';
import {
    StyledButton,
    StyledAccountIcon,
    StyledDropDownWrapper,
    StyledDropdownContainer,
    StyledAnchor
} from './sign-out.styles';


const SignOutButton = () => {
    const { setLogin, setUserToken, user, setUserAuth } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSignOut = () => {
        if (user) {
            const expires = new Date(new Date().getTime());
            setUserAuth(user, Number(expires));
        }
        setLogin(false);
        setUserToken(null);
    };

    const toggleExpanded = () => {
        setIsOpen(!isOpen);
    };

    return (
        <React.Fragment>
            <StyledDropDownWrapper>
                <StyledButton onClick={() => toggleExpanded()}>
                    <StyledAccountIcon />
                    <span>{user?.name}</span>
                </StyledButton>
                <StyledDropdownContainer isOpen={isOpen}>
                    <StyledAnchor onClick={() => handleSignOut()}>Sign out</StyledAnchor>
                </StyledDropdownContainer>
                <Backdrop isOpen={isOpen} toggleClose={() => toggleExpanded()} />
            </StyledDropDownWrapper>
        </React.Fragment>
    );
};

export default SignOutButton;