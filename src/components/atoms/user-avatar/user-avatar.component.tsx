import React, { FC } from 'react';

import { StyledAvatar } from './user-avatar.styles';

interface Props {
    name: string;
}


const UserAvatar: FC<Props> = ({ name }) => (
    <StyledAvatar>{name.slice(0, 1)}</StyledAvatar>
);

export default UserAvatar;