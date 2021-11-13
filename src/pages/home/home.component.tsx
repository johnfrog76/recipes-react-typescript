import React, { useContext } from "react";
import { HeroStyles, HeroSubTitle } from "./home.styles";
import { Theme, ThemeContext } from "../../provider/theme/theme.provider"

export const HomePage = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const handleTheme = () => {
        if (theme === Theme.Dark) {
            setTheme(Theme.Light);
        } else {
            setTheme(Theme.Dark);
        }
    };
    return (
        <React.Fragment>
            <HeroStyles>Welcome to Recipe App</HeroStyles>
            <HeroSubTitle>Here you will find collection of your favorite recipes.</HeroSubTitle>
            <button onClick={() => handleTheme()}>set theme</button>
        </React.Fragment>
    )
}

