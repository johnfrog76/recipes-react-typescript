import styled from 'styled-components';

export const StyledPageTitle = styled.h2`
    font-size: ${(props) => props.theme.fontSizes.medium};
    line-height: normal;
    margin-bottom: 0.5em;
    color: ${(props) => props.theme.colors.pageHighLight1};
`;

export const DetailsTopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const MetaInfoWrapper = styled.div`
    color: #fff;
    background-color: ${(props) => props.theme.colors.pageHighLight2};
    padding: 1rem;
`;