import React, { FC } from 'react';

import { StyledFieldWrapper } from './field-wrapper.styles'

interface Props {
    children?: React.ReactNode
}


const FieldWrapper: FC<Props> = ({ children }) => {

    return (
        <StyledFieldWrapper>
            {children}
        </StyledFieldWrapper>
    );
}

export default FieldWrapper;