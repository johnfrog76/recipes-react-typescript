import styled from 'styled-components';

import {Field} from 'formik';

export const StyledFormWrapper = styled.div`
    padding: 1.5rem;
    border: 1px solid ${props => props.theme.colors.pageBackground3};
`;

export const StyledHRule = styled.hr`
    border: 1px solid ${(props) => props.theme.colors.navBarBackground};
    margin: 1.5rem 0;
`;