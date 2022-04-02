import styled from 'styled-components';

export const StyledButtonLink = styled.button`
    font-size: 1rem;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${props => props.theme.colors.pageLinkColor1};
    line-height: inherit;
    &:hover {
        text-decoration: underline;
    }
    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
        text-decoration: none;
    }
`;