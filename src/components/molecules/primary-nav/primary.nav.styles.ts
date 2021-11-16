import styled from 'styled-components';


export const StyledNavUl = styled.ul`
    display: flex;
    align-items: center;
`;

export const StyledListItem = styled.li`
    margin: 1rem;
    > a {
        color: #fff;
        text-decoration: none;
    }
`;

export const StyledNavBar = styled.div`
    height: 55px;
    max-width: 100vw;
    background-color: ${(props) => props.theme.colors.navBarBackground};
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
`;