import React, { FC, useState, useContext } from 'react';
import { StyledCheckBox, CheckBoxIcon, StyledFieldWrapper } from './checkbox-plain.styles';
import { ThemeContext, Theme } from '../../../providers/theme/theme.provider';

type Props = {
    id: string;
    value: string;
    inputChangeHandler: (value: string | undefined, checked: boolean) => void;
}

const CheckboxPlain: FC<Props> = ({ id, value, inputChangeHandler }) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { theme } = useContext(ThemeContext);
    return (
        <StyledFieldWrapper>
            <label htmlFor={id}>
                <CheckBoxIcon ison={isChecked ? 'yes' : 'no'} />
            </label>
            <StyledCheckBox
                type="checkbox"
                ThemeStyle={theme}
                id={id}
                value={value}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    inputChangeHandler(evt.target.value, evt.target.checked);
                    setIsChecked(evt.target.checked)
                }}
            />
        </StyledFieldWrapper>

    )
}

export default CheckboxPlain;