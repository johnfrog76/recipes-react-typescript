import styled from 'styled-components';
import Restaurant from '@material-ui/icons/Restaurant';

export const StyledNavBrand = styled(Restaurant)`
    font-size: 2.0rem !important;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    padding: 0.25rem;
    color: #fff;
    flex: 0 0 1;
    background-color: ${props => props.theme.colors.pageHighLight2};
    border: 1px solid rgba(255,255,255, 0.75);
    border-radius: 50%;
`;

