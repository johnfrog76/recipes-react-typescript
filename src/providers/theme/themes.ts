import { PALLETS } from "./color-palletes"

export const darkTheme = {
    colors: {
        pageBackground1: PALLETS.grey[900],
        pageBackground2: PALLETS.grey[800],
        pageBackground3: PALLETS.grey[800],
        pageForeground1: PALLETS.grey[50],
        pageLinkColor1: PALLETS.teal.A200,
        pageHighLight1: PALLETS.teal.A100,
        pageHighLight2: PALLETS.teal.A700,
        navBarBackground: PALLETS.teal[800],
        pageSecondaryColor1: PALLETS.teal[700]
    },
    fonts: ["sans-serif", "Roboto"],
    fontSizes: {
        small: "1em",
        regular: "1.5em",
        medium: "2em",
        large: "3em"
    }
}

export const lightTheme = {
    colors: {
        pageBackground1: PALLETS.grey[50],
        pageBackground2: PALLETS.grey[200],
        pageBackground3: PALLETS.grey[300],
        pageForeground1: PALLETS.grey[900],
        pageLinkColor1: PALLETS.blue[900],
        pageHighLight1: PALLETS.blue.A100,
        pageHighLight2: PALLETS.blue.A700,
        navBarBackground: PALLETS.blue[800],
        pageSecondaryColor1: PALLETS.blue[700],
    },
    fonts: ["sans-serif", "Roboto"],
    fontSizes: {
        small: "1em",
        regular: "1.5em",
        medium: "2em",
        large: "3em"
    }
}