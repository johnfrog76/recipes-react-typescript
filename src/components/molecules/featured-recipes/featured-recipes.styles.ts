import styled from 'styled-components';

export const CardList = styled.div`
    width: 100%;
    margin: 0;
    padding: 1.5rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90vw, 1fr));
    @media (min-width: 991px) {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
    grid-gap: 1.2rem;
    overflow: hidden;
`;


