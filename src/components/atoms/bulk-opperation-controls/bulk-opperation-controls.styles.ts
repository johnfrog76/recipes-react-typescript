import styled from 'styled-components';
import { MoreHoriz } from '@material-ui/icons';

export const StyledControlWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const StyledMoreIconButton = styled.button`
    font-size: 1rem;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.pageLinkColor1};
    cursor: pointer;
`;

export const StyledListItem = styled.li`
    line-height: 2rem;
    white-space: nowrap;
`

export const StyledToolBarDivider = styled.div`
    position: relative;
    display: flex;
    padding-right: 0.75rem;
    margin-right: 0.50rem;
    line-height: 1.5rem;

    &::after {
        position: absolute;
        content: '';
        right: 0;
        width: 1px;
        height: 100%;
        background-color: ${props => props.theme.colors.pageForeground1};
        opacity: 0.3;
    }
`;

export const StyledMoreIcon = styled(MoreHoriz)`
    font-size: 1.5rem !important;
`;

export const StyledToggleButton = styled.button`
    font-size: 1rem;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.colors.pageLinkColor1};
    &:hover {
        text-decoration: underline;
    }
    line-height: inherit;
`;

export const StyledMenuContent = styled.div`
    position: absolute;
    z-index: 20;
    top: 1.75rem;
    right: 20%;
    min-height: 150px;
    min-width: 150px;
    padding: 1rem;
    background-color: ${props => props.theme.colors.pageBackground1};
    border: 1px solid ${props => props.theme.colors.pageBackground3};
    color: ${props => props.theme.colors.pageForeground1};
`;