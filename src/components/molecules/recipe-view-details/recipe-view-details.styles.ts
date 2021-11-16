import styled from "styled-components";

export const StyledDetailsDiv = styled.div`
    color: ${(props) => props.theme.colors.pageForeground1};
`;

export const StyledH4 = styled.h4`
    font-size: 1.25rem;
    margin: 0.5em 0;
    color: ${(props) => props.theme.colors.pageForeground1};
`;

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
`;

export const StyledHRule = styled.hr`
    border: 1px solid ${(props) => props.theme.colors.navBarBackground};
    margin: 1.5rem 0;
`;