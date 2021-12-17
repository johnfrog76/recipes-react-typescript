import styled from "styled-components";

import { StarBorder, Star } from "@material-ui/icons";
import {Theme as ThemeEnum } from '../../../providers/theme/theme.provider';

interface iThemeStyleProp {
    ThemeStyle?: ThemeEnum;
    inverse: string;
}

export const StyledRatingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 90px;
`;

export const StarFilled = styled(Star)<iThemeStyleProp>`
    color: #fff;
    ${props => props.inverse === 'yes' && `
        color: ${props.theme.colors.navBarBackground};
    `};
`;

export const StarOutlined = styled(StarBorder)<iThemeStyleProp>`
    color: #fff;
    ${props => props.inverse === 'yes' && `
        color: ${props.theme.colors.navBarBackground};
    `};
`;

