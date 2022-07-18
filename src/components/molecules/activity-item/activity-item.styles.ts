import styled from "styled-components";
import {MenuBook, Favorite, Comment} from '@material-ui/icons';
import {NavLink} from 'react-router-dom';

const common = (props: any) => `
    color: ${props.theme.colors.navBarBackground};
    font-size: 1.75rem !important;

    @media (min-width: 576px) {
        font-size: 2.4rem !important;
    }
`;

export const StyledRecipeIcon = styled(MenuBook)`
    ${props => common(props)}
`;

export const StyledCommentIcon = styled(Comment)`
    ${props => common(props)}
`;

export const StyledFavoriteIcon = styled(Favorite)`
    ${props => common(props)}
`;

export const StyledListItem = styled.li`
    color: ${props => props.theme.colors.pageForeground1};
    padding: 1.5rem 1.5rem 1.5rem 0;
    border: 2px solid ${props => props.theme.colors.pageBorderColor1};
    margin-bottom: 1rem;
    display: flex;
    width: 100%;
`;

export const StyledIconWrap = styled.div`
    flex: 0 0 4.5rem;
    @media (min-width: 576px) {
        flex: 0 0 7.5rem;
    }
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledDateTimeSpan = styled.span`
    opacity: 0.33;
`;

export const StyledCardInner = styled.div`
    flex: 1;
`;

export const StyledNavLink = styled(NavLink)`
    color: ${props => props.theme.colors.pageLinkColor1};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

