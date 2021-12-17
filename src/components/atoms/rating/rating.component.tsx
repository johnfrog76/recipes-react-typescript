import React, { FC } from "react";
import { StyledRatingContainer, StarFilled, StarOutlined } from "./rating.styles";

interface Props {
    rating?: number;
    inverse?: boolean;
}

const RecipeRating: FC<Props> = ({ rating = 0, inverse = false }) => {
    let stars: any[] = [true, true, true, true];

    return (
        <StyledRatingContainer title={`rated ${rating} stars`}>
            {stars.map((item, idx) => idx < rating ?
                (<StarFilled inverse={inverse ? 'yes' : 'no'} key={idx} />)
                :
                (<StarOutlined inverse={inverse ? 'yes' : 'no'} key={idx} />)
            )}
        </StyledRatingContainer>
    );
}

export default RecipeRating;