import styled from 'styled-components';

export const CardItem = styled.div`
    background-color: ${(props) => props.theme.colors.pageSecondaryColor1};
    padding: 1rem;
    color: #fff;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const CardCopy = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
`;

export const CardTitle = styled.h3`
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;  
overflow: hidden;
`;

export const CardBottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    * { flex: 1}
    a {
        color: #fff;
        text-decoration: none;
        flex: 0 0 1;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        svg {
            flex: 0 0 24px;
        }
    }
`;

export const CardMetaInfo = styled.div`
    display: flex;
    align-items: top;
    justify-content: left;
    * {
        flex: 1;
    }
    span {
        position: relative;
        padding-right: 8px;
        margin-right: 8px;
        flex: 0;
        &:before {
            position: absolute;
            content: '';
            right: 0;
            width: 1px;
            height: 100%;
            background-color: #fff;
            opacity: 0.5;
        }
    }
`;