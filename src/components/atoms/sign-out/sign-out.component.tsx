import React, { useContext } from 'react';

import { UserContext } from '../../../providers/user/user.provider';
import { StyledButton } from './sign-out.styles';


const SignOutButton = () => {
    const { setLogin, isLoggedIn } = useContext(UserContext);

    const handleSignOut = () => {
        setLogin(false);
    }

    return (
        <React.Fragment>
            <StyledButton onClick={() => handleSignOut()}>Sign out</StyledButton>
        </React.Fragment>
    );
};

export default SignOutButton;