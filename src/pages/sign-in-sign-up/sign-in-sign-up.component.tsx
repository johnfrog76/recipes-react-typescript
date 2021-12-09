import React from 'react';

import { MainSection } from '../../components/atoms/main-section/main-section.component';
import PageTitle from '../../components/atoms/page-title/page-title.component';
import SignInForm from '../../templates/sign-in-form/sign-in-form.component';
import { StyledNavLink, StyledSignUpContainer } from './sign-in-sign-up.styles';

const SignInSignUpPage = () => {
    return (
        <MainSection>
            <PageTitle>Sign in</PageTitle>
            <SignInForm />
            <StyledSignUpContainer>
                New to recipes?&nbsp;
                <StyledNavLink to="/sign-up">Sign up</StyledNavLink>
            </StyledSignUpContainer>
        </MainSection>
    )
}

export default SignInSignUpPage;