import styled from "styled-components";

import { StarBorder, Star } from "@material-ui/icons";

export const StyledRatingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 90px;
`;

export const StarFilled = styled(Star)`
    color: #fff;
`;

export const StarOutlined = styled(StarBorder)`
    color: #fff;
`;

