import React, { FC } from 'react';

import { StyledBackdrop } from './backdrop.styles'

type Props = {
    isOpen: boolean;
    toggleClose: () => void;
}

const Backdrop: FC<Props> = ({ isOpen, toggleClose }) => (
    <StyledBackdrop isOpen={isOpen} onClick={() => toggleClose()} />
)

export default Backdrop;