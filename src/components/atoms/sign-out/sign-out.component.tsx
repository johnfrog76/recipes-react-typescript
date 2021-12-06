import React, { useContext, useState } from 'react';

import { UserContext } from '../../../providers/user/user.provider';
import { StyledButton, StyledAccountIcon, StyledDropDownWrapper, StyledDropdownContainer, StyledAnchor, StyledBackDrop } from './sign-out.styles';


const SignOutButton = () => {
    const { setLogin, setUserToken, isLoggedIn, user, setUserObject } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSignOut = () => {
        setLogin(false);
        setUserToken(null);
    }

    const toggleExpanded = () => {
        setIsOpen(!isOpen);
    }

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
                <StyledBackDrop isOpen={isOpen} onClick={() => toggleExpanded()} />
            </StyledDropDownWrapper>

        </React.Fragment>
    );
};

export default SignOutButton;