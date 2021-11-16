import styled from 'styled-components';

export const StyledPageTitle = styled.h2`
    font-size: ${(props) => props.theme.fontSizes.medium};
    margin-bottom: 0.5em;
    color: ${(props) => props.theme.colors.pageHighLight1};
`;