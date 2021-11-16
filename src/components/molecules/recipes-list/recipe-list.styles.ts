import styled from 'styled-components';

export const StyledList = styled.ul`
    list-style: disc;
`;

export const StyledListItem = styled.li`
    list-style: outside;
    margin: 0.75em 0 0.75em 2em;
    color: ${(props) => props.theme.colors.pageForeground1};
    &::marker {
        color: ${(props) => props.theme.colors.navBarBackground};
    }
    &>a {
        color: ${(props) => props.theme.colors.pageForeground1};
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;