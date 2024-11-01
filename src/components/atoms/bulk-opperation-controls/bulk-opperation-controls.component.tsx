import React, { FC, useState, useContext } from 'react';
import { useToasts } from 'react-toast-notifications';

import Backdrop from '../backdrop/backdrop.component';
import ButtonLink from '../button-link/button-link.component';
import ConfirmDialog from '../../molecules/confirm-dialog/confirm-dialog.component';
import { AuthContext } from '../../../providers/auth/auth.provider';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import {
    addShareBulk, removeShareBulk
} from '../../../services/recipes/recipes.services';
import {FavoritesService, IFavoritesBulkResponse, IFavoritesService} from '../../../services/favorites/favorites.service';
import {
    StyledControlWrap, StyledListItem, StyledMoreIconButton, StyledToolBarDivider, StyledMoreIcon,
    StyledToggleButton, StyledMenuContent
} from './bulk-opperation-controls.styles';


enum actionItemEnums {
    favorite = "favorites add",
    unfavorite = "favorites remove",
    share = "sharing add",
    noshare = "sharing remove"
}

interface iActionItem {
    id: keyof typeof actionItemEnums;
    name: actionItemEnums;
    notAllowed: boolean;
}

type Props = {
    bulkCount: number;
    handleEditMode: () => void;
    selectMode: boolean;
    bulkList: string[];
    isMixedList: boolean;
}

const BulkOpperationsControls: FC<Props> = ({ bulkCount, bulkList, handleEditMode, selectMode, isMixedList }) => {
    const favoritesService: IFavoritesService = new FavoritesService();
    const { addToast } = useToasts();
    const { user, token } = useContext(AuthContext);
    const { recipeItems, bulkUpdateRecipes, setRecipeItems } = useContext(RecipesContext);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [actionType, setActionType] = useState<string>('');

    const handleActionsMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleConfirmCancel = () => {
        setConfirmOpen(false);
    };

    const handleConfirmed = () => {
        const getPlural = () => bulkCount !== 1 ? 's' : '';
        let confirmMsg = `${bulkCount} item${getPlural()} updated`;
        setConfirmOpen(false);
        setIsOpen(false);
        handleEditMode();

        if (user?.userId) {
            switch (actionType) {
                case "favorite":
                    favoritesService.addFavoriteBulk(bulkList, user.userId, token).then((resp: IFavoritesBulkResponse) => {

                        setRecipeItems(bulkUpdateRecipes(resp.data, recipeItems));
                        addToast(
                            `Success: ${confirmMsg}`,
                            {
                                appearance: 'success',
                                autoDismiss: true
                            }
                        );
                    }).catch(err => {
                        addToast(
                            `Error: ${err.message}`,
                            {
                                appearance: 'error',
                                autoDismiss: false
                            }
                        );
                    })
                    break;
                case "unfavorite":
                    favoritesService.removeFavoriteBulk(bulkList, user.userId, token).then((resp: IFavoritesBulkResponse) => {
                        setRecipeItems(bulkUpdateRecipes(resp.data, recipeItems));
                        addToast(
                            `Success: ${confirmMsg}`,
                            {
                                appearance: 'success',
                                autoDismiss: true
                            }
                        );
                    }).catch(err => {
                        addToast(
                            `Error: ${err.message}`,
                            {
                                appearance: 'error',
                                autoDismiss: false
                            }
                        );
                    })
                    break;
                case "share":
                    addShareBulk(bulkList, user.userId, token).then(resp => {
                        setRecipeItems(bulkUpdateRecipes(resp.data, recipeItems));
                        addToast(
                            `Success: ${confirmMsg}`,
                            {
                                appearance: 'success',
                                autoDismiss: true
                            }
                        );
                    }).catch(err => {
                        addToast(
                            `Error: ${err.message}`,
                            {
                                appearance: 'error',
                                autoDismiss: false
                            }
                        );
                    })
                    break;
                case "noshare":
                    removeShareBulk(bulkList, user.userId, token).then(resp => {
                        setRecipeItems(bulkUpdateRecipes(resp.data, recipeItems));
                        addToast(
                            `Success: ${confirmMsg}`,
                            {
                                appearance: 'success',
                                autoDismiss: true
                            }
                        );
                    }).catch(err => {
                        addToast(
                            `Error: ${err.message}`,
                            {
                                appearance: 'error',
                                autoDismiss: false
                            }
                        );
                    })
                    break;
            }
        }
    };

    const handleActionClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        const actionValue = (evt.target as HTMLButtonElement).id;
        setActionType(actionValue);
        setConfirmOpen(true);
    }

    const actionItems: iActionItem[] = [
        { id: "favorite", name: actionItemEnums.favorite, notAllowed: false },
        { id: "unfavorite", name: actionItemEnums.unfavorite, notAllowed: false },
        { id: "share", name: actionItemEnums.share, notAllowed: isMixedList },
        { id: "noshare", name: actionItemEnums.noshare, notAllowed: isMixedList }
    ];

    return (
        <StyledControlWrap>
            {
                selectMode && bulkCount > 0 && (
                    <React.Fragment>
                        <Backdrop isOpen={isOpen} toggleClose={() => handleActionsMenu()} />
                        <StyledToolBarDivider>
                            <StyledMoreIconButton onClick={() => handleActionsMenu()} title={`${bulkCount} item${bulkCount !== 1 ? 's' : ''} selected`}>
                                <StyledMoreIcon />
                                <span>({bulkCount})</span>
                            </StyledMoreIconButton>
                            <ul>
                                {
                                    isOpen && <StyledMenuContent>
                                        {
                                            actionItems.map(({ id, name, notAllowed }) => (
                                                <StyledListItem key={id}>
                                                    <ButtonLink
                                                        id={id}
                                                        disabled={notAllowed}
                                                        clickHandler={handleActionClick}
                                                    >{name}</ButtonLink>
                                                </StyledListItem>
                                            ))
                                        }
                                    </StyledMenuContent>
                                }
                            </ul>
                        </StyledToolBarDivider>
                    </React.Fragment>
                )
            }
            {
                <StyledToolBarDivider>
                    <StyledToggleButton onClick={() => handleEditMode()} title={selectMode ? 'Cancel select items' : 'Select items'}>
                        {selectMode ? 'Cancel' : 'Select items'}
                    </StyledToggleButton>
                </StyledToolBarDivider>
            }
            <ConfirmDialog
                open={confirmOpen}
                title={"Are you sure?"}
                confirmText={`${actionItemEnums[actionType as keyof typeof actionItemEnums]} for ${bulkCount} ${bulkCount !== 1 ? 'items' : 'item'}`}
                handleCancel={handleConfirmCancel}
                handleConfirm={handleConfirmed}
            />
        </StyledControlWrap>
    )
}

export default BulkOpperationsControls;