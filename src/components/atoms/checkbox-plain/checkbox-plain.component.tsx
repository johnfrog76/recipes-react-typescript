import React, { FC, useState, useContext, useEffect } from 'react';
import { StyledCheckBox, CheckBoxIcon, StyledFieldWrapper } from './checkbox-plain.styles';
import { ThemeContext, Theme } from '../../../providers/theme/theme.provider';

type Props = {
    id: string;
    value: string;
    inputChangeHandler: (value: string | undefined, checked: boolean) => void;
    isChecked?: boolean;
}

const CheckboxPlain: FC<Props> = ({ id, value, inputChangeHandler, isChecked = false }) => {
    const [overrideIsChecked, setOverrideIsChecked] = useState<boolean>(false);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        setOverrideIsChecked(isChecked)
    }, [isChecked])

    return (
        <StyledFieldWrapper>
            <label htmlFor={id}>
                <CheckBoxIcon ison={overrideIsChecked ? 'yes' : 'no'} />
            </label>
            <StyledCheckBox
                type="checkbox"
                ThemeStyle={theme}
                id={id}
                checked={overrideIsChecked}
                value={value}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    setOverrideIsChecked(evt.target.checked);
                    inputChangeHandler(evt.target.value, evt.target.checked);
                }}
            />
        </StyledFieldWrapper>

    )
}

export default CheckboxPlain;