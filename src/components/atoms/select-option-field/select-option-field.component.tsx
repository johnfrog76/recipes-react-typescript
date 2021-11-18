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

    const [isFirstElementSelected, setIsFirstElementSelected] = useState<boolean>(field.value === undefined);

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
            {label && (<StyledLabel htmlFor={id}>{label}</StyledLabel>)}
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
                    onChange={(event: React.ChangeEvent) => {
                        field.onChange(event);
                        (event.target as HTMLSelectElement).selectedIndex === 0 ? setIsFirstElementSelected(true) : setIsFirstElementSelected(false);
                    }
                    }
                >
                    {defaultOptionText && <option disabled={required} selected>{defaultOptionText}</option>}
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
