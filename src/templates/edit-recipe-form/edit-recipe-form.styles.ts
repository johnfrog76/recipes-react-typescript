import styled from 'styled-components';

import {Field} from 'formik';

interface iRequiredLabel {
    Required?: 'required'
}

export const StyledFormWrapper = styled.div`
    padding: 1.5rem;
    border: 1px solid ${props => props.theme.colors.pageBackground3};
`;

export const StyledInputWrapper = styled.div`
    margin-bottom: 1rem;
`;

export const InputButtonsWrap = styled.div`
    display: flex;
    margin-left: 1rem;
`

export const FieldArrayItem = styled.div`
    display: flex;
    align-items: center;
`

export const StyledAddInputBtn = styled.button`
    color: #fff;
    border: 0;
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    margin: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.navBarBackground};
    cursor: pointer;
`;

export const StyledSubtractInputBtn = styled.button`
    color: ${props => props.theme.colors.pageForeground1};
    border: 0;
    width: 2rem;
    height: 2rem;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.pageBackground3};
    cursor: pointer;
`;

export const StyledLabel = styled.label<iRequiredLabel>`
    color: ${props => props.theme.colors.pageForeground1};
    display: block;
    margin-bottom: 0.25rem;
    &::before {
        content: '${props => props.Required ? '* ' : ''}';
        color: ${props => props.theme.colors.pageHighLight2};
        font-size: 18px;
        font-weight: 700;
    }
`;

export const StyledInput = styled(Field)`
    border: 2px solid ${props => props.theme.colors.pageBorderColor1};
    color: ${props => props.theme.colors.pageForeground1};
    background-color: ${props => props.theme.colors.pageBackground1};
    font-size: 1rem;
    width: 100%;
    height: 2.5rem;
    padding: .25rem .5rem;
    &:focus {
        border: 2px solid ${props => props.theme.colors.navBarBackground};
        outline: 0;
    }
`;

export const StyledHRule = styled.hr`
    border: 1px solid ${(props) => props.theme.colors.navBarBackground};
    margin: 1.5rem 0;
`;

export const StyledFieldArrayEmptyButton = styled.button`
    background-color: ${props => props.theme.colors.pageBackground3};
    border: 0;
    font-size: 1rem;
    color: ${props => props.theme.colors.pageForeground1};
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    cursor: pointer;
`;

