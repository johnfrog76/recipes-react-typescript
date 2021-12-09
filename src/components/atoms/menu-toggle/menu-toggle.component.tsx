import React, { FC } from 'react';

import { StyledButton, StyledMenu } from './menu-toggle.styles';

interface Props {
    toggleHandler: () => void;
}


const MenuToggle: FC<Props> = ({ toggleHandler }) => {
    return (
        <StyledButton onClick={() => toggleHandler()}>
            <StyledMenu />
        </StyledButton>
    )
}

export default MenuToggle;

