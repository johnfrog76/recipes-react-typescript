import { Theme } from '@material-ui/core';
import styled from 'styled-components';
import {Theme as ThemEnum} from '../.../../../../providers/theme/theme.provider';

interface iThemeStyleProp {
    ThemeStyle: ThemEnum;
}

export const CardItem = styled.div<iThemeStyleProp>`
    background-color: ${(props) => props.theme.colors.pageSecondaryColor1};
    padding: 1rem;
    color: #fff;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${props => props.ThemeStyle === ThemEnum.Light && `
        background-color: #fff;
        border: 2px solid ${props.theme.colors.pageSecondaryColor1};
        border-top: 0.5rem solid ${props.theme.colors.pageSecondaryColor1};
        color: ${props.theme.colors.pageForeground1};
    `}
`;

export const CardCopy = styled.p`
    font-weight: 300;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
`;

export const CardTitleWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CardTitle = styled.h3`
    font-weight: 400;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding-right: 0.5rem;
`;

export const CardBottomWrapper = styled.div<iThemeStyleProp>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    * { flex: 1}
    a {
        color: #fff;
        text-decoration: none;
        flex: 0 0 1;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        svg {
            flex: 0 0 24px;
        }
    }
    ${props => props.ThemeStyle === ThemEnum.Light && `
        a {
            color: ${props.theme.colors.pageLinkColor1};
        }
    `}
`;

export const CardMetaInfo = styled.div<iThemeStyleProp>`
    display: flex;
    align-items: top;
    justify-content: left;
    * {
        flex: 1;
    }

    span {
        position: relative;
        padding-right: 8px;
        margin-right: 8px;
        flex: 0;
        &:before {
            position: absolute;
            content: '';
            right: 0;
            width: 1px;
            height: 100%;
            background-color: #fff;
            opacity: 0.5;
        }
        ${props => props.ThemeStyle === ThemEnum.Light && `
            &::before {
                background-color: ${props.theme.colors.pageForeground1};
            }
        `}
    }
`;