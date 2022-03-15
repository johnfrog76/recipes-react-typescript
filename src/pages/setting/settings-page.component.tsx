import React from 'react';
import { MainSection } from '../../components/atoms/main-section/main-section.component';
import PageTitle from '../../components/atoms/page-title/page-title.component';
import ThemePaletteSwitcher from '../../components/molecules/theme-palette-switcher/theme-palette-switcher.component';
import ThemeSwitcher from '../../components/molecules/theme-switcher/theme-switcher.component';
import { StyledFormWrapper } from '../../templates/add-recipe-form/add-recipe-form.styles';
import RemoveUserComponent from '../../components/molecules/remove-user/remove-user.component';
const SettingsPage = () => (
    <MainSection>
        <PageTitle>Settings</PageTitle>
        <StyledFormWrapper>
            <ThemePaletteSwitcher />
            <ThemeSwitcher settingsPresentation={true} />
        </StyledFormWrapper>
        <RemoveUserComponent></RemoveUserComponent>
    </MainSection>
);

export default SettingsPage;