import styled from 'styled-components';

export const TagContainer = styled.div`
    background-color: ${props => props.theme.colors.pageBackground2};
    font-size: ${props => props.theme.fontSizes.small};
    color: #fff;
    padding: 1.5rem 1.5rem 0.75rem 1.5rem;
`;

export const TagList = styled.ul`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
    li {
        background-color: ${props => props.theme.colors.pageHighLight2};
        padding: 0.5rem 1rem;
        margin: 0 0.5rem 1rem 0.5rem;
        border-radius: 0 1rem 0 1rem;
        @media (min-width: 1400px) {
            &:nth-child(even) {
                border-radius: 1rem 0 1rem 0;
            }
        }
        a {
            color: #fff;
            text-decoration: none;
        }
    }
`;