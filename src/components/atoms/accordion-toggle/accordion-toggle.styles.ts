import styled from 'styled-components';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';


export const StyledButtonToggle = styled.button`
    padding: 0;
    margin: 0;
    border: 0;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme.colors.pageLinkColor1};
    background-color: transparent;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

interface iStyledToggleWrap {
    Space: 'yes' | 'no';
}

export const StyledToggleWrap = styled.div<iStyledToggleWrap>`
    color: ${(props) => props.theme.colors.pageForeground1};
    display: flex;
    align-items: center;
    padding: 1rem 0;
    padding: ${props => props.Space === 'yes' ? '1rem 0' : '0 0 1rem 0'};
`;

export const StyledArrowDown = styled(KeyboardArrowDown)`
    font-size: 1.5rem !important;
`;

export const StyledArrowUp = styled(KeyboardArrowUp)`
    font-size: 1.5rem !important;
`;