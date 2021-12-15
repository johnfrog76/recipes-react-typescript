import React, { useContext, createContext, useState, FC, useEffect } from "react";
import { getDarkTheme, getLightTheme, paletteItems } from './themes';
import { ThemeProvider } from "styled-components";

export enum Theme {
    Dark = 'Dark',
    Light = 'Light',
}

export type ThemeContextType = {
    theme: Theme;
    setTheme: (Theme: Theme) => void;
    setPaletteDark: (val: any) => void;
    setPaletteLight: (val: any) => void;
    paletteItems: any;
    currentDark: string;
    currentLight: string;
    setCurrentDark: (val: string) => void;
    setCurrentLight: (val: string) => void;
}

interface Props {
    children?: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: Theme.Dark,
    setTheme: theme => { },
    setPaletteDark: () => { },
    setPaletteLight: () => { },
    paletteItems,
    currentDark: '',
    currentLight: '',
    setCurrentDark: (val: string) => { },
    setCurrentLight: (val: string) => { }
});
export const useTheme = () => useContext(ThemeContext);

const MyTheme: FC<Props> = ({ children }) => {
    const [currentDark, setCurrentDark] = useState('pink');
    const [currentLight, setCurrentLight] = useState('blue');
    const [theme, setTheme] = useState(Theme.Dark);
    const [paletteDark, setPaletteDark] = useState(paletteItems['pink']);
    const [paletteLight, setPaletteLight] = useState(paletteItems['blue']);


    useEffect(() => {
        const str = localStorage.getItem('storedTheme');

        if (str) {
            const parsed = JSON.parse(str);
            setPaletteLight(parsed.palletLight);
            setPaletteDark(parsed.paletteDark);
            setCurrentDark(parsed.currentDark);
            setCurrentLight(parsed.currentLight);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('storedTheme', JSON.stringify(({ currentDark, currentLight, paletteDark, paletteLight })))
    }, [paletteDark, paletteLight, currentLight, currentDark]);



    return (
        <ThemeContext.Provider value={{ theme, setTheme, setPaletteDark, setPaletteLight, paletteItems, currentDark, currentLight, setCurrentDark, setCurrentLight }}>
            <ThemeProvider theme={theme === Theme.Dark ? getDarkTheme(paletteDark) : getLightTheme(paletteLight)}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );

}

export default MyTheme;