import {
    grey,
    pink,
    purple,
    green,
    cyan,
    deepPurple,
    indigo,
    teal,
    blue,
    lightBlue,
    lightGreen,
    yellow,
    deepOrange
} from 'material-colors-ts';

export const paletteItems = {
    pink,
    purple,
    green,
    cyan,
    deepPurple,
    indigo,
    teal,
    blue,
    lightGreen,
    deepOrange,
    lightBlue,
    yellow
}

export const getDarkTheme = (palette: any) => {
    return {
        colors: {
            pageBackground1: grey[900],
            pageBackground2: grey[800],
            pageBackground3: grey[700],
            pageBorderColor1: grey[500],
            pageForeground1: grey[50],
            pageLinkColor1: palette.A200,
            pageHighLight1: palette.A100,
            pageHighLight2: palette.A700,
            navBarBackground: palette[800],
            pageSecondaryColor1: palette[700],
            pageToastSuccess: '#2E7D32',
            pageToastError: '#C62828'
        },
        fonts: ["sans-serif", "Roboto"],
        fontSizes: {
            small: "1em",
            smallPlus: "1.2em",
            regular: "1.5em",
            medium: "2em",
            large: "3em"
        }
    }
}

export const getLightTheme = (palette: any) => {
    return {
        colors: {
            pageBackground1: grey[50],
            pageBackground2: grey[200],
            pageBackground3: grey[300],
            pageBorderColor1: grey[500],
            pageForeground1: grey[900],
            pageLinkColor1: palette[900],
            pageHighLight1: palette.A100,
            pageHighLight2: palette.A700,
            navBarBackground: palette[800],
            pageSecondaryColor1: palette[700],
            pageToastSuccess: '#2E7D32',
            pageToastError: '#C62828'
        },
        fonts: ["sans-serif", "Roboto"],
        fontSizes: {
            small: "1em",
            smallPlus: "1.2em",
            regular: "1.5em",
            medium: "2em",
            large: "3em"
        }
    }
}