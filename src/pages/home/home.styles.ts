import styled from 'styled-components';

export const HeroStyles = styled.h1`
    font-size: ${(props) => props.theme.fontSizes.medium};
    margin-bottom: 0.5em;
    color: ${(props) => props.theme.colors.pageHighLight1};
`;

export const HeroSubTitle = styled.h2`
    font-size: 1rem;
    color: ${(props) => props.theme.colors.pageForeground1};
`;

export const HeroWrapper = styled.div`
    padding: 2rem;
    background-color: ${props => props.theme.colors.pageBackground2};
`;