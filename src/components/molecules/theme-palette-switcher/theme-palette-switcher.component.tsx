import React, { useContext, useEffect, useState } from 'react';
import { Theme, ThemeContext } from '../../../providers/theme/theme.provider';
import SelectOptionPlain, { iKeyValuePair } from '../../atoms/select-option-plain/select-option-plain.component';
import { StyledWrapDiv } from './theme-palette-switcher.styles';


const ThemePaletteSwitcher = () => {
    const {
        theme,
        setPaletteDark,
        setPaletteLight,
        paletteItems,
        currentDark,
        currentLight,
        setCurrentDark,
        setCurrentLight
    } = useContext(ThemeContext);
    const [selectValDark, setSelectValDark] = useState(currentDark);
    const [selectValLight, setSelectValLight] = useState(currentLight);
    const [themeColors, setThemeColors] = useState<iKeyValuePair[]>([]);

    const handleChangeLight = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const val = evt.target.value;
        setPaletteLight(paletteItems[val])
        setCurrentLight(val);
    };

    const handleChangeDark = (evt: any) => {
        const val = evt.target.value;
        setPaletteDark(paletteItems[val])
        setCurrentDark(val);
    };

    useEffect(() => {
        const temp: iKeyValuePair[] = Object.keys(paletteItems).map(
            item => {
                const name = item.split(/(?=[A-Z])/).join(' ').toLowerCase();

                return {
                    name: name,
                    id: item
                }
            }
        );

        setThemeColors(temp)
    }, [paletteItems]);

    useEffect(() => {
        setSelectValLight(currentLight);
        setSelectValDark(currentDark);
    }, [currentDark, currentLight]);

    return (
        <StyledWrapDiv>
            {
                theme === Theme.Dark ? (
                    <SelectOptionPlain
                        id="dark"
                        name="dark"
                        value={selectValDark}
                        handleChange={handleChangeDark}
                        optionData={themeColors}
                        labelText="Dark Theme Palette"
                    />
                ) : (
                    <SelectOptionPlain
                        id="light"
                        name="light"
                        value={selectValLight}
                        handleChange={handleChangeLight}
                        optionData={themeColors}
                        labelText="Light Theme Palette"
                    />
                )
            }
        </StyledWrapDiv>
    );

}

export default ThemePaletteSwitcher;