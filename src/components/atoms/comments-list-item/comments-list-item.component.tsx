import React, { FC } from "react";

import { StyledListItem, UserAvatar, UserWrapper } from "./comments-list-item.styles";


interface Props {
    item: { comment: string, user: string }
}

const CommentItem: FC<Props> = ({ item }) => {

    const { user, comment } = item;
    return (
        <StyledListItem>
            <UserWrapper>
                <UserAvatar>{user.slice(0, 1)}</UserAvatar>
                <div>
                    <div>{user}</div>
                    <div>
                        {comment}
                    </div>
                </div>
            </UserWrapper>
        </StyledListItem>
    );
}

export default CommentItem;