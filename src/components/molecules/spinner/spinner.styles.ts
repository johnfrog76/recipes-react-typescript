import React from 'react';
import styled from 'styled-components';
import CircularProgress from "@material-ui/core/CircularProgress";

export const SpinnerWrapper = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const StyledCircularProgress = styled(CircularProgress)`
    color: ${props => props.theme.colors.pageHighLight2} !important;
`;


export const SpinnerOuter = styled.div`
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;