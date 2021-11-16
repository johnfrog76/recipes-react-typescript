import React, { useContext, createContext, useState, FC } from "react";
import { darkTheme, lightTheme } from './themes';
import { ThemeProvider } from "styled-components";

export enum Theme {
    Dark = 'Dark',
    Light = 'Light',
}

export type ThemeContextType = {
    theme: Theme;
    setTheme: (Theme: Theme) => void;
}

interface Props {
    children?: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextType>({ theme: Theme.Dark, setTheme: theme => { } });
export const useTheme = () => useContext(ThemeContext);

const MyTheme: FC<Props> = ({ children }) => {
    const [theme, setTheme] = useState(Theme.Dark);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ThemeProvider theme={theme === Theme.Dark ? darkTheme : lightTheme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );

}

export default MyTheme;