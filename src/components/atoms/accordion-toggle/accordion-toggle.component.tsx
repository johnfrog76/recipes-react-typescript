import React, { FC } from 'react';

import { StyledButtonToggle, StyledToggleWrap, StyledArrowDown, StyledArrowUp } from './accordion-toggle.styles'

type Props = {
    isOpen: boolean;
    toggleHandler: () => void;
    buttonText: string;
    spacing?: boolean;
}

const AccordionToggle: FC<Props> = ({ isOpen, toggleHandler, buttonText, spacing = true }) => (
    <StyledToggleWrap Space={spacing ? 'yes' : 'no'}>
        <StyledButtonToggle
            type="button"
            onClick={() => toggleHandler()}
        >
            <span>{buttonText}</span>
            {
                isOpen ? (
                    <StyledArrowUp />
                ) : (
                    <StyledArrowDown />
                )
            }
        </StyledButtonToggle>
    </StyledToggleWrap>
)

export default AccordionToggle;