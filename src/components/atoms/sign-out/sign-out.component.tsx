import React, { useContext, useState } from 'react';

import { UserContext } from '../../../providers/user/user.provider';
import Backdrop from '../../atoms/backdrop/backdrop.component';
import {
    StyledButton,
    StyledAccountIcon,
    StyledDropDownWrapper,
    StyledDropdownContainer,
    StyledAnchor
} from './sign-out.styles';


const SignOutButton = () => {
    const { setLogin, setUserToken, user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSignOut = () => {
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