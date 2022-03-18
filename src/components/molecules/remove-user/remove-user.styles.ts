import styled from 'styled-components';

export const StyledFormWrapper = styled.div`
    color: ${(props) => props.theme.colors.pageForeground1};
    padding: 1.5rem;
    border: 1px solid ${props => props.theme.colors.pageBackground3};
    margin-bottom: 0.5rem;
`;

export const StyledUnderlabel = styled.div`
    color: ${props => props.theme.colors.pageForeground1};
    margin-bottom: 0.5rem;
`
