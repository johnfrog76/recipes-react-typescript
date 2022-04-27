import React, { FC } from "react";

import {
    StyledDeleteIcon,
    StyledEditIcon,
    StyledPrintIcon,
    StyledButton,
    StyledFavoriteOutlineIcon,
    StyledFavoriteIcon,
    StyledCopyIcon
} from './user-action-button-icon.styles';

interface Props {
    icon: ButtonIconTypeEnum;
    clickHandler: (evt: React.SyntheticEvent) => void;
    disabled?: boolean;
    title?: string;
    inverse?: boolean;
}

export enum ButtonIconTypeEnum {
    delete = 0,
    edit = 1,
    print = 2,
    favorite = 4,
    unfavorite = 5,
    copy = 6
}

const UserActionButtonIcon: FC<Props> = ({ icon, clickHandler, disabled = false, title, inverse = false }) => {
    return (
        <StyledButton inverse={inverse ? 'yes' : 'no'} title={title} disabled={disabled} onClick={(evt) => clickHandler(evt)}>
            {
                icon === ButtonIconTypeEnum.delete && (
                    <StyledDeleteIcon />
                )
            }
            {
                icon === ButtonIconTypeEnum.edit && (
                    <StyledEditIcon />
                )
            }
            {
                icon === ButtonIconTypeEnum.print && (
                    <StyledPrintIcon />
                )
            }
            {
                icon === ButtonIconTypeEnum.favorite && (
                    <StyledFavoriteIcon />
                )
            }
            {
                icon === ButtonIconTypeEnum.unfavorite && (
                    <StyledFavoriteOutlineIcon />
                )
            }
            {
                icon === ButtonIconTypeEnum.copy && (
                    <StyledCopyIcon />
                )
            }
        </StyledButton>
    )
}

export default UserActionButtonIcon;