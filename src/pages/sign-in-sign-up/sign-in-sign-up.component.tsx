import React from 'react';

import { MainSection } from '../../components/atoms/main-section/main-section.component';
import Spinner from '../../components/molecules/spinner/spinner.component';
import PageTitle from '../../components/atoms/page-title/page-title.component';
import SignInForm from '../../components/molecules/sign-in-form/sign-in-form.component';

const SignInSignUpPage = () => {
    return (
        <MainSection>
            <PageTitle>Sign in</PageTitle>
            <SignInForm />
        </MainSection>
    )
}

export default SignInSignUpPage;