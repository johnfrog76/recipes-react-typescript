import styled from 'styled-components';

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