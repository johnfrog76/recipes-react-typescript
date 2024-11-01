import React from 'react';

import { MainSection } from '../../components/atoms/main-section/main-section.component';
import PageTitle from '../../components/atoms/page-title/page-title.component';
import UsersList from '../../components/molecules/users-list/users-list.component';

const UsersPage = () => (
    <MainSection>
        <PageTitle>Users</PageTitle>
        <UsersList />
    </MainSection>
);

export default UsersPage;