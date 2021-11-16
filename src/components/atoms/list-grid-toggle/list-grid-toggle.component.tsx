import React, { FC } from "react";

import { StyledGridOnIcon, StyledListIcon, StyledButton } from './list-grid-toggle.styles'

interface Props {
    grid: boolean;
    onClick: VoidFunction
}

const ListGridToggleButton: FC<Props> = ({ grid, onClick }) => (
    <StyledButton title={grid ? 'View list' : 'View cards'} onClick={onClick}>
        {
            grid ? (
                <StyledListIcon />
            ) : (
                <StyledGridOnIcon />
            )
        }
    </StyledButton>
);

export default ListGridToggleButton;