import React, { FC } from 'react';

import { StyledButtonLink } from './button-link.styles'

interface Props {
    children?: React.ReactNode;
    disabled?: boolean;
    id?: string | undefined;
    clickHandler: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}
const ButtonLink: FC<Props> = ({ children, id, disabled, clickHandler }) => {
    return (
        <StyledButtonLink
            id={id}
            onClick={(evt) => clickHandler(evt)}
            disabled={disabled}
        >
            {children}
        </StyledButtonLink>
    )
}

export default ButtonLink;