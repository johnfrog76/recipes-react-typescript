import React, { FC } from 'react';

import { StyledClose, StyledButton } from './close-button.styles';


interface Props {
    closeHandler: () => void;
}


const CloseButton: FC<Props> = ({ closeHandler }) => (
    <StyledButton title="close" type="button" onClick={() => closeHandler()}>
        <StyledClose />
    </StyledButton>
)

export default CloseButton;