import React, { FC } from 'react';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';

import UserAvatar from '../../atoms/user-avatar/user-avatar.component';
import { StyledUserCard, StyledNavLink, StyledNoSharedRecipes } from './user-card.styles';

interface Props {
    name: string;
    id: string;
    recipes: string[];
    isContentOwner: boolean;
}


const UserCard: FC<Props> = ({ name, id, recipes, isContentOwner }) => (
    <li>
        <StyledUserCard>
            <UserAvatar name={name} />
            <div>
                <div>{name}</div>
                {
                    recipes.length === 0 && (<StyledNoSharedRecipes>no recipes</StyledNoSharedRecipes>)
                }
                {
                    recipes.length !== 0 && !isContentOwner && (
                        <StyledNavLink to={`/user-recipes/${id}`}>
                            {
                                recipes.length !== 1 ? (
                                    <span>shared {recipes.length} recipes</span>
                                ) : (
                                    <span>shared {recipes.length} recipe</span>
                                )
                            }
                        </StyledNavLink>
                    )
                }
                {
                    recipes.length !== 0 && isContentOwner && (
                        <StyledNavLink to={`/user-recipes/${id}`}>
                            {
                                recipes.length !== 1 ? (
                                    <span>view {recipes.length} recipes </span>
                                ) : (
                                    <span>view {recipes.length} recipe</span>
                                )
                            }
                        </StyledNavLink>
                    )
                }
            </div>
        </StyledUserCard>
    </li>
);

export default UserCard;







