import React, { useState, FC } from "react";

import { useField, Field } from "formik";
import FieldWrapper from '../../atoms/field-wrapper/field-wrapper.component';
import { StyledSelect, StyledLabel } from './select-option-field.styles';

interface iKeyValuePair {
    id: string;
    name: string;
}

interface Props {
    as?: string;
    id: string;
    label?: string;
    name: string;
    dataType?: string;
    optionData: iKeyValuePair[] | undefined;
    defaultOptionText?: string;
    required?: boolean;
    disabled?: boolean;
}

const SelectOptionField: FC<Props> = ({
    as,
    id,
    label,
    name,
    dataType,
    optionData,
    defaultOptionText,
    required = false,
    disabled = false,
}) => {
    const [field, meta, helpers] = useField({ name, id });
    const { setValue } = helpers;

    if (!optionData) {
        optionData = [];
    }

    if (dataType === 'boolean') {
        if (field.value === 'true' || field.value === 'false') {
            field.value === 'true' ? setValue(true, false) : setValue(false, false);
        }
    }


    return (
        <FieldWrapper>
            {label && (<StyledLabel Required={required} htmlFor={id}>{label}</StyledLabel>)}
            <StyledSelect>
                <Field
                    as="select"
                    className='select'
                    {...field}
                    id={id}
                    name={name}
                    datatype={dataType || "string"}
                    disabled={disabled}
                    required={required}
                >
                    {defaultOptionText && <option value="">{defaultOptionText}</option>}
                    {
                        optionData.map((item: iKeyValuePair) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))
                    }
                </Field>
            </StyledSelect>
        </FieldWrapper>
    );
}

export default SelectOptionField;
