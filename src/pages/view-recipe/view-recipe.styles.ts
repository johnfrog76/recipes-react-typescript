import styled from 'styled-components';

export const DetailsTopWrapper = styled.div`
    position: relative;
    > h2 {
        max-width: 60%;
    }
`;

export const MetaInfoTop = styled.div`
    background-color: ${(props) => props.theme.colors.pageHighLight2};
    min-width: 200px;
    padding: 1rem;
`;

export const MetaInfoBottom = styled.div`
    padding: 1rem;
    color: ${(props) => props.theme.colors.pageForegroundColor1};
`;

export const MetaInfoWrapper = styled.div`
    @media (min-width: 595px) {
        position: absolute;
        top: 0;
        right: 0;
    }
    color: #fff;
    padding: 0 0 1rem 0;
`;