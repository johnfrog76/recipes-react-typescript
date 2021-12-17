import React, { FC } from "react";

import { StyledListItem, UserWrapper } from "./comments-list-item.styles";
import UserAvatar from '../../atoms/user-avatar/user-avatar.component';

interface Props {
    item: { comment: string, user: string }
}

const CommentItem: FC<Props> = ({ item }) => {

    const { user, comment } = item;
    return (
        <StyledListItem>
            <UserWrapper>
                <UserAvatar name={user} />
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