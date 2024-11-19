import styled from 'styled-components';

interface iStyledLabel {
    Required: boolean;
}

export const StyledLabel = styled.label<iStyledLabel>`
    color: ${props => props.theme.colors.pageForeground1};
    display: block;
    margin-bottom: 0.25rem;
    &::after {
        content: '${props => props.Required ? '*' : ''}';
        color: ${props => props.theme.colors.pageHighLight2};
        font-size: 18px;
        font-weight: 700;
        padding-left: 0.3rem;
    }
`;

export const StyledSelect = styled.div`
    .select {
        width: 100%;
        color: ${props => props.theme.colors.pageForeground1};
        height: 2.5rem;
        font-size: 1rem;
        background-color: ${props => props.theme.colors.pageBackground1};
        border: 2px solid ${props => props.theme.colors.pageBorderColor1};
        padding: 0.25rem 0.5rem;
        border-radius: 0;
        outline: none;
        margin: 0;
        &:focus {
            border: 2px solid ${props => props.theme.colors.navBarBackground};
            outline: 0;
        }
    }
`;
