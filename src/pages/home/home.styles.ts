import styled from 'styled-components';
import { Widgets } from '@material-ui/icons';

export const HeroStyles = styled.h1`
    font-size: ${(props) => props.theme.fontSizes.large};
    font-weight: 300;
    line-height: 0.9em;
    margin-bottom: 0.5em;
    color: ${(props) => props.theme.colors.pageHighLight2};
`;

export const SpinnerWrapper = styled.div`
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const HeroSubTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.2em;
    color: ${(props) => props.theme.colors.pageForeground1};
`;

export const HeroWrapper = styled.div`
    padding: 2rem;
    background-color: ${props => props.theme.colors.pageBackground2};
    background: linear-gradient(
        to right,
        ${props => props.theme.colors.pageBackground1},
        75%,
        ${props => props.theme.colors.navBarBackground}
    );
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
`;

export const StyledHeroGraphic = styled(Widgets)`
    color: ${(props) => props.theme.colors.pageHighLight2};
    font-size: 5.6rem !important;
    margin: -6vw 1.25rem 0 -2.6rem;
    @media (min-width: 576px) {
        font-size: 11.6rem !important;
        margin: 0 1.25rem 0 -1.25rem;
    }
`;