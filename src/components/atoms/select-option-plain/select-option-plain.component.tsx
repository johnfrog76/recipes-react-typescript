import React, { FC, ChangeEvent } from 'react';

import { StyledLabel, StyledSelect } from './select-option-plain.styles';

export interface iKeyValuePair {
    id: string;
    name: string;
}

interface Props {
    id: string;
    name: string;
    value: string;
    handleChange: (evt: ChangeEvent<HTMLSelectElement>) => void;
    optionData: iKeyValuePair[]
    labelText?: string;
}

const SelectOptionPlain: FC<Props> = ({ id, name, value, handleChange, optionData, labelText }) => (
    <React.Fragment>
        {
            labelText && (<StyledLabel htmlFor={id} Required={false}>{labelText}</StyledLabel>)
        }
        <StyledSelect id={id} name={name} value={value} onChange={evt => handleChange(evt)}>
            {
                optionData.map((o, idx) => (
                    <option key={idx} value={o.id}>{o.name}</option>
                ))
            }
        </StyledSelect>

    </React.Fragment>
);

export default SelectOptionPlain;