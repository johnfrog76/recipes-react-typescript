import styled from "styled-components";

export const StyledListItem = styled.li`
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: ${(props) => props.theme.colors.pageBackground2};
`;

export const UserWrapper = styled.div`
    display: flex;
    justify-conent: flex-start;
    align-items: center;
`;