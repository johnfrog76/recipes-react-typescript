import React, { FC } from "react";

import {
    StyledDeleteIcon,
    StyledEditIcon,
    StyledPrintIcon,
    StyledShareIcon,
    StyledButton,
    StyledFavoriteOutlineIcon,
    StyledFavoriteIcon
} from './user-action-button-icon.styles';

interface Props {
    icon: ButtonIconTypeEnum;
    clickHandler: (evt: React.SyntheticEvent) => void;
    disabled?: boolean;
    title?: string;
}

export enum ButtonIconTypeEnum {
    delete = 0,
    edit = 1,
    print = 2,
    favorite = 4,
    unfavorite = 5
}

const UserActionButtonIcon: FC<Props> = ({ icon, clickHandler, disabled = false, title }) => {
    return (
        <StyledButton title={title} disabled={disabled} onClick={(evt) => clickHandler(evt)}>
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
        </StyledButton>
    )
}

export default UserActionButtonIcon;