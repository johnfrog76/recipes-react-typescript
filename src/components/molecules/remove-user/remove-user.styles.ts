import styled from 'styled-components';

export const StyledFormWrapper = styled.div`
    color: ${(props) => props.theme.colors.pageForeground1};
    padding: 1.5rem;
    border: 1px solid ${props => props.theme.colors.pageBackground3};
    margin-bottom: 0.5rem;
`;

export const StyledButtonToggle = styled.button`
    padding: 0;
    margin: 0 0 0 0.5rem;
    border: 0;
    font-size: 1rem;
    color: ${props => props.theme.colors.pageLinkColor1};
    background-color: transparent;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

export const StyledUnderlabel = styled.div`
    color: ${props => props.theme.colors.pageForeground1};
    margin-bottom: 0.5rem;
`

export const StyledToggleWrap = styled.div`
    color: ${(props) => props.theme.colors.pageForeground1};
    display: flex;
    align-items: center;
    padding: 1rem 0;
`;