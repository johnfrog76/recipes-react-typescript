import React, { FC, useState } from 'react';
import { StyledControlWrap, StyledListItem, StyledMoreIconButton, StyledToolBarDivider, StyledMoreIcon, StyledToggleButton, StyledMenuContent } from './bulk-opperation-controls.styles';
import Backdrop from '../backdrop/backdrop.component';
import ButtonLink from '../button-link/button-link.component';

type Props = {
    bulkCount: number;
    handleEditMode: () => void;
    selectMode: boolean;
    bulkList: string[];
    isMixedList: boolean;
}

interface iActionItem {
    id: string;
    name: string;
    notAllowed: boolean;
}

const BulkOpperationsControls: FC<Props> = ({ bulkCount, bulkList, handleEditMode, selectMode, isMixedList }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleActionsMenu = () => {
        setIsOpen(!isOpen);

    };

    const handleActionClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        const actionType = (evt.target as HTMLButtonElement).id;
        console.log('clicked', bulkList, 'action', actionType);
        // TODO Confirm Actions
        // make request and deal with success and failure
    }

    const actionItems: iActionItem[] = [
        { id: "favorite", name: 'add favorites', notAllowed: false },
        { id: "share", name: 'share recipes', notAllowed: isMixedList },
        { id: "copy", name: 'copy recipes', notAllowed: false },
        { id: "delete", name: 'delete recipes', notAllowed: isMixedList }
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
        </StyledControlWrap>
    )
}

export default BulkOpperationsControls;