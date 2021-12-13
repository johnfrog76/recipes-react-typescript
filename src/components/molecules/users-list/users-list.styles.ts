import styled from 'styled-components';

export const StyledUserCardList = styled.ul`
    width: 100%;
    margin: 1.5em 0 0 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80vw, 1fr));
    @media (min-width: 991px) {
        grid-template-columns: repeat(auto-fit, minmax(23.75rem, 1fr));
    }
    grid-gap: 1.2rem;
    overflow: hidden;
    color: ${props => props.theme.colors.pageForeground1};
`;

