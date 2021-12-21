import React, { FC } from 'react';

import { StyledEmptyMessage } from './empty-message.styles';

interface Props {
    msg: string;
}

export const EmptyMesssage: FC<Props> = ({ msg }) => (
    <StyledEmptyMessage>
        {msg}
    </StyledEmptyMessage>
)

export default EmptyMesssage;