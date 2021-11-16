import React, { FC } from "react";
import { StyledMain } from "./main-section.styles";

interface Props {
    children?: React.ReactNode
}

export const MainSection: FC<Props> = ({ children }) => (
    <StyledMain children={children} />
);