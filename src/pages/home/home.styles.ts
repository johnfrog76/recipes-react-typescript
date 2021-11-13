import styled from 'styled-components';

export const HeroStyles = styled.h1`
    font-size: 22px;
    font-family: Arial;
    color: green;
    background-color: ${(props) =>props.theme.colors.pageBackground1};
`;
export const HeroSubTitle = styled.h2`
    font-size: 1rem;
    color: purple;
`;