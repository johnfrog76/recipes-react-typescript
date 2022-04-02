import styled from 'styled-components';
import Check from '@mui/icons-material/Check';
import {Theme as ThemEnum} from '../.../../../../providers/theme/theme.provider';

interface iStyledProps {
    ison: string;
}

interface iThemeStyleProp {
    ThemeStyle: ThemEnum;
}

export const CheckBoxIcon = styled(Check)<iStyledProps>`
    color: ${props => props.ison === 'yes' ? '#fff': 'transparent'};
    background-color: ${props => props.ison === 'yes' ? props.theme.colors.navBarBackground : 'transparent' };
    font-size: 2rem !important;
    padding: 0;
    margin: 0 0.5rem 0 0;
`;

export const StyledCheckBox = styled.input<iThemeStyleProp>`
    appearance: none;
    position: absolute;
    width: 1.2rem;
    height 1.2rem;
    background-color: transparent;
    top: 4px;
    left: 2px;
    outline: 2px solid ${props => props.value ? props.theme.colors.navBarBackground : props.theme.colors.pageBorderColor1};
    outline-offset: 5px;
    ${props => props.ThemeStyle === ThemEnum.Dark && `
        outline: 2px solid rgba(255,255,255, 0.3);
    `}
    &:focus {
        outline: 2px solid ${props => props.value? props.theme.colors.pageBorderColor1 : props.theme.colors.navBarBackground};
        outline-offset: 5px;
    }
`;

export const StyledFieldWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    flex: 0 0 2.7rem;
`;