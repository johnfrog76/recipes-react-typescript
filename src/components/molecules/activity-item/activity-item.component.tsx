import React, { FC } from 'react';
import { iActivity, ActivityTypeEnum } from "../../../interfaces/activity/activity.interface";
import {
    StyledListItem, StyledCardInner, StyledIconWrap, StyledNavLink, StyledCommentIcon, StyledFavoriteIcon, StyledRecipeIcon
} from "./activity-item.styles";


const ActivityItem: FC<iActivity> = ({ type, recipeName, recipeId, createdAt, timeNum, timeFormatted, description }) => {
    return (
        <StyledListItem>
            <StyledIconWrap>
                {type === ActivityTypeEnum.Comment && <StyledCommentIcon />}
                {type === ActivityTypeEnum.Favorite && <StyledFavoriteIcon />}
                {type === ActivityTypeEnum.Recipe && <StyledRecipeIcon />}
            </StyledIconWrap>
            <StyledCardInner>
                <StyledNavLink to={`/recipes/${recipeId}`}>
                    {recipeName}
                </StyledNavLink>

                <div>{description}</div>
                <div>{timeFormatted}</div>
            </StyledCardInner>
        </StyledListItem>)
}

export default ActivityItem;