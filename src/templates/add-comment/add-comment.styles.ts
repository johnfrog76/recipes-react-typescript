import styled from 'styled-components';

export const StyledFormWrapper = styled.div`
    padding: 1.5rem;
    border: 1px solid ${props => props.theme.colors.pageBackground2};
    margin-bottom: 0.5rem;
`;

interface iStyledAccordionContent {
    Collapsed: 'expanded' | 'collapsed';
}

export const StyledAccordionContent = styled.div<iStyledAccordionContent>`
    height: auto;
    ${props => props.Collapsed === 'collapsed' && `
        height: 0;
        overflow: hidden;
    `}
`;





