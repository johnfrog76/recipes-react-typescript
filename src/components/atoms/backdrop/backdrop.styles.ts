import styled from 'styled-components';


interface iStyledMenuOuter {
    isOpen: boolean;
}

export const StyledBackdrop = styled.div<iStyledMenuOuter>`
    background-color: rgba(0, 0, 0, 0.2);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 19;
    display: ${props => props.isOpen ? 'block' : 'none'};
`;