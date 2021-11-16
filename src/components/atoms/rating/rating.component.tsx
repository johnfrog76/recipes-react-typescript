import React, { FC } from "react";
import { StyledRatingContainer, StarFilled, StarOutlined } from "./rating.styles";

interface Props {
    rating?: number;
}

const RecipeRating: FC<Props> = ({ rating = 0 }) => {
    let stars: any[] = [true, true, true, true];

    return (
        <StyledRatingContainer title={`rated ${rating} stars`}>
            {stars.map((item, idx) => idx < rating ?
                (<StarFilled key={idx} />)
                :
                (<StarOutlined key={idx} />)
            )}
        </StyledRatingContainer>
    );
}

export default RecipeRating;