import React, { FC } from 'react';
import { NavLink } from "react-router-dom";

import { StyledRightItemsWrapper, StyledRightListItem } from './sign-in-out.styles';
import SignOutButton from "../../atoms/sign-out/sign-out.component";

interface Props {
    isLoggedIn: boolean;
}

const SignInSignOut: FC<Props> = ({ isLoggedIn }) => (
    <StyledRightItemsWrapper>
        <StyledRightListItem>
            {
                isLoggedIn ?
                    (
                        <SignOutButton />
                    )
                    :
                    (
                        <NavLink to="/sign-in">sign in</NavLink>
                    )
            }
        </StyledRightListItem>
    </StyledRightItemsWrapper>
)

export default SignInSignOut;