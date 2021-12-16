import React, { useContext, FC } from 'react';
import { Theme, ThemeContext } from "../../../providers/theme/theme.provider";
import { StyledThemeButton, StyledDarkModeIcon, StyledLightModeIcon } from './theme-switcher.styles';


interface Props {
    settingsPresentation?: boolean;
}

const ThemeSwitcher: FC<Props> = ({ settingsPresentation = false }) => {
    const { theme, setTheme } = useContext(ThemeContext);
    const handleTheme = () => {
        if (theme === Theme.Dark) {
            setTheme(Theme.Light);
        } else {
            setTheme(Theme.Dark);
        }
    };

    return (
        <StyledThemeButton Settings={settingsPresentation}
            title={
                theme === Theme.Dark ?
                    'Switch to Light Theme'
                    :
                    'Switch to Dark Theme'
            }
            onClick={() => handleTheme()}
        >
            {
                theme === Theme.Dark ?
                    (<StyledLightModeIcon />)
                    :
                    (<StyledDarkModeIcon />)
            }
            &nbsp;theme
        </StyledThemeButton>
    )
}

export default ThemeSwitcher;