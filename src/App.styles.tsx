import styled from 'styled-components';

export const StyledOuterDiv = styled.div`
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.5em;
  background-color: ${(props) => props.theme.colors.pageBackground1};
  max-width: 100vw;
  min-height: 100vh;
  border-bottom: 1rem solid ${(props) => props.theme.colors.navBarBackground};
  overflow: hidden;
`;
