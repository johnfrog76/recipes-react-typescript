import React, { useContext, createContext, useState, FC } from "react";
import { ThemeProvider } from "styled-components";

export enum Theme {
    Dark = 'Dark',
    Light = 'Light',
}


const theme1 = {
    colors: {
        pageBackground1: "#111",
        pageForeground1: "#ccc"
    },
    fonts: ["sans-serif", "Roboto"],
    fontSizes: {
        small: "1em",
        medium: "2em",
        large: "3em"
    }
}

const theme2 = {
    colors: {
        pageBackground1: "#f1f1f1",
        pageForeground1: "#000"
    },
    fonts: ["sans-serif", "Roboto"],
    fontSizes: {
        small: "1em",
        medium: "2em",
        large: "3em"
    }
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
            <ThemeProvider theme={theme === Theme.Dark ? theme1 : theme2}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );

}

export default MyTheme;