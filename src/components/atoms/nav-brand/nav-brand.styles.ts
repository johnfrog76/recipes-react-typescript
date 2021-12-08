import styled from 'styled-components';
import Restaurant from '@material-ui/icons/Restaurant';

export const StyledNavBrandWrap = styled.div`
    font-size: 1.25rem;
    > a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #fff;
    }
`;

export const StyledBrandText = styled.span`
    display: none;
    @media (min-width: 576px) {
        display: block;
    }
`

export const StyledNavBrand = styled(Restaurant)`
    font-size: 1.5rem !important;
    margin-right: 0.5rem;
    color: #fff;
`;

