import React, { FC } from 'react';
import { StyledPageTitle } from './page-title.styles';

interface Props {
    children?: React.ReactNode
}

const PageTitle: FC<Props> = ({ children }) => (
    <StyledPageTitle children={children} />
);

export default PageTitle;