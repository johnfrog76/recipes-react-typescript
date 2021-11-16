import styled from 'styled-components';

export const StyledCardContainer = styled.div`
    width: 100%;
    margin: 1.5em 0 0 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80vw, 1fr));
    @media (min-width: 991px) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    grid-gap: 1.2rem;
    overflow: hidden;
`;