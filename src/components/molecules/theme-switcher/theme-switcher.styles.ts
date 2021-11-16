import styled from 'styled-components';
import WbSunny from '@material-ui/icons/WbSunny';

export const StyledThemeButton = styled.button`
    background-color: transparent;
    border: 0;
    padding: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #fff;
`;

export const StyledThemeIcon = styled(WbSunny)`
    font-size: 1.25rem !important;
    margin-right: 5px;
`;