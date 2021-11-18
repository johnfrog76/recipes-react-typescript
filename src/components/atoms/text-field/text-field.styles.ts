import styled from 'styled-components';

export const StyledInput = styled.input`
    border: 2px solid ${props => props.theme.colors.pageBorderColor1};
    color: ${props => props.theme.colors.pageForeground1};
    background-color: ${props => props.theme.colors.pageBackground1};
    width: 100%;
    font-size: 1rem;
    height: 2.5rem;
    padding: .25rem .5rem;
    &:focus {
        border: 2px solid ${props => props.theme.colors.navBarBackground};
        outline: 0;
    }
`;

export const StyledLabel = styled.label`
    color: ${props => props.theme.colors.pageForeground1};
    display: block;
    margin-bottom: 0.25rem;
`