import styled from 'styled-components';

export const StyledFormWrapper = styled.div`
    padding: 1.5rem;
    border: 1px solid ${props => props.theme.colors.pageBackground2};
    margin-bottom: 0.5rem;
`;

export const StyledButtonToggle = styled.button`
    padding: 0;
    margin: 0 0 1rem 1rem;
    border: 0;
    font-size: 1rem;
    color: ${props => props.theme.colors.pageLinkColor1};
    background-color: transparent;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;





