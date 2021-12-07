import React from 'react';

import { MainSection } from '../../components/atoms/main-section/main-section.component'
import PageTitle from '../../components/atoms/page-title/page-title.component';
import SignUpForm from '../../components/molecules/sign-up-form/sign-up-form.component';

const SignUpPage = () => (
    <MainSection>
        <PageTitle>Sign Up</PageTitle>
        <SignUpForm />
    </MainSection>
);

export default SignUpPage;