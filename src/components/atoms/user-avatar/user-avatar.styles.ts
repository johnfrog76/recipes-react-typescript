import styled from 'styled-components';

export const StyledAvatar = styled.span`
    text-transform: capitalize;
    background-color: ${(props) => props.theme.colors.pageHighLight2};
    color: #fff;
    font-size: 1.3em;
    padding: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
`;