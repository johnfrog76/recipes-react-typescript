import React, { useContext } from 'react';
import { Theme, ThemeContext } from "../../../providers/theme/theme.provider";
import { StyledThemeButton, StyledThemeIcon } from './theme-switcher.styles';


const ThemeSwitcher = () => {

    const { theme, setTheme } = useContext(ThemeContext);
    const handleTheme = () => {
        if (theme === Theme.Dark) {
            setTheme(Theme.Light);
        } else {
            setTheme(Theme.Dark);
        }
    };
    return (
        <StyledThemeButton
            title={
                theme === Theme.Dark ?
                    'Switch to Light Theme'
                    :
                    'Switch to Dark Theme'
            }
            onClick={() => handleTheme()}>
            <StyledThemeIcon />
        </StyledThemeButton>
    )
}

export default ThemeSwitcher;