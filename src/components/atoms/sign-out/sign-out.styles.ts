import styled from 'styled-components';
import AccountCircle from '@material-ui/icons/AccountCircle';

interface iDropdownStyles {
    isOpen: boolean;
}


export const StyledAccountIcon = styled(AccountCircle)`
    color: #fff;
    font-size: 2rem !important;
    margin-right: 0.25rem;
`;

export const StyledButton = styled.button`
    background-color: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    font-size: inherit;
    font-family: inherit;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

export const StyledDropdownContainer = styled.div<iDropdownStyles>`
    position: absolute;
    bottom: -76px;
    width: 140px;
    height: 65px;
    background-color: ${props => props.theme.colors.pageBackground1};
    border: 1px solid ${props => props.theme.colors.pageBackground3};
    color: ${props => props.theme.colors.pageForeground1};
    right: 0;
    z-index: 21;
    box-sizing: border-box;
    padding: 0.5rem 1.5rem;
    display: ${props => props.isOpen ? 'flex': 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledAnchor = styled.a`
    cursor: pointer;
    color: ${props => props.theme.colors.pageLinkColor1};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const StyledDropDownWrapper = styled.div`
    display: flex;
    position: relative;
`;