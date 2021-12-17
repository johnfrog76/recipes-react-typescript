import styled from 'styled-components';
import Check from '@mui/icons-material/Check';

interface iStyledLabel {
    Required: boolean;
}

interface iStyledProps {
    ison: string;
}

export const StyledLabel = styled.label<iStyledLabel>`
    color: ${props => props.theme.colors.pageForeground1};
    display: block;
    margin-bottom: 0.25rem;
    &::before {
        content: '${props => props.Required ? '*' : ''}';
        color: ${props => props.theme.colors.pageHighLight2};
        font-size: 18px;
        font-weight: 700;
        padding-right: 0.3rem;
    }
`;

export const StyledFieldWrapper = styled.div`
    margin: 1.5rem 0 1rem 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-end;
    position: relative;
`;

export const CheckBoxIcon = styled(Check)<iStyledProps>`
    color: ${props => props.ison === 'yes' ? '#fff': 'transparent'};
    background-color: ${props => props.ison === 'yes' ? props.theme.colors.navBarBackground : 'transparent' };
    font-size: 2rem !important;
    padding: 0;
    margin: 0 0.5rem 0 0;
`;

export const StyledCheckBox = styled.input`
    appearance: none;
    position: absolute;
    width: 1.2rem;
    height 1.2rem;
    background-color: transparent;
    top: 4px;
    left: 2px;
    outline: 2px solid ${props => props.value ? props.theme.colors.navBarBackground : props.theme.colors.pageBorderColor1};
    outline-offset: 5px;
    &:focus {
        outline: 2px solid ${props => props.value? props.theme.colors.pageBorderColor1 : props.theme.colors.navBarBackground};
        outline-offset: 5px;
    }
`;