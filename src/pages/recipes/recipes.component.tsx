import React, { useState, useContext, useEffect } from "react";

import { MainSection } from "../../components/atoms/main-section/main-section.component";
import PageTitle from "../../components/atoms/page-title/page-title.component";
import RecipeList from "../../components/molecules/recipes-list/recipes-list.component";
import BulkOperationControls from "../../components/atoms/bulk-opperation-controls/bulk-opperation-controls.component";
import ListGridToggleButton from "../../components/atoms/list-grid-toggle/list-grid-toggle.component";
import { RecipesContext } from '../../providers/recipes/recipes.provider';
import { AuthContext } from "../../providers/auth/auth.provider";
import RecipeCardList from '../../components/molecules/recipes-category-card-list/recipes-category-card-list.component';
import { StyledTitleWrapper, StyledSpinnerWrap, StyledToolBar } from './recipes.styles';
import EmptyMesssage from "../../components/atoms/empty-message/empty-message.component";
import Spinner from "../../components/molecules/spinner/spinner.component";
import { iRecipe } from "../../interfaces/recipe/recipe.interface";

const checkMixedList = (bulkList: string[], recipeItems: iRecipe[], userId: string | undefined) => {
    let ret = false;
    if (!userId) {
        return ret;
    }

    for (let i = 0; i < recipeItems.length; i++) {
        const item = recipeItems[i];

        if (bulkList.findIndex((bulkItem) => bulkItem === item._id && item.user_id !== userId) !== -1) {
            ret = true;
            break;
        }
    }
    return ret;
};

const RecipesPage = () => {
    const [isGridView, setIsGridView] = useState<boolean>(true);
    const [isMixedList, setIsMixedList] = useState<boolean>(false);
    const [filteredRecipes, setFilteredRecipes] = useState<iRecipe[]>([]);
    const { recipeItems, isLoading } = useContext(RecipesContext);
    const { user, isLoggedIn } = useContext(AuthContext);
    const [selectMode, setSelectMode] = useState<boolean>(false);
    const [bulkList, setBulkList] = useState<string[]>([]);
    const [bulkCount, setBulkCount] = useState<number>(0);

    const onButtonClick = () => {
        setIsGridView(!isGridView);
        setSelectMode(false);

    };

    const handleEditMode = () => {
        setSelectMode(!selectMode);
        setBulkList([]);
        setBulkCount(0);
    };

    const handleSelectChange = (id: string | undefined, checked: boolean) => {
        if (id) {
            let templist = bulkList;
            if (checked) {
                templist.push(id);
            } else {
                let idx = templist.findIndex(item => item === id);
                templist.splice(idx, 1)
            }
            setBulkList(templist);
            setBulkCount(templist.length);
            let isMixedTemp = checkMixedList(bulkList, recipeItems, user?.userId);
            setIsMixedList(isMixedTemp);
        }
    }

    useEffect(() => {
        const filteredItems: iRecipe[] = recipeItems.filter((r) => r.shared || r.user_id === user?.userId);
        setFilteredRecipes(filteredItems);
    }, [user, recipeItems]);

    return (
        <MainSection>
            <StyledTitleWrapper>
                <PageTitle>Recipes ({filteredRecipes.length})</PageTitle>
                <StyledToolBar>
                    {isGridView && isLoggedIn && (

                        <BulkOperationControls
                            bulkCount={bulkCount}
                            bulkList={bulkList}
                            handleEditMode={() => handleEditMode()}
                            selectMode={selectMode}
                            isMixedList={isMixedList}
                        />
                    )}
                    <ListGridToggleButton grid={isGridView} onClick={() => onButtonClick()} />
                </StyledToolBar>
            </StyledTitleWrapper>
            {
                isLoading && (
                    <StyledSpinnerWrap>
                        <Spinner />
                    </StyledSpinnerWrap>
                )
            }
            {
                !isLoading && filteredRecipes.length !== 0 &&
                    isGridView ? (
                    <RecipeCardList recipes={filteredRecipes} selectMode={selectMode} onSelectChange={handleSelectChange} />
                ) : (
                    <RecipeList recipes={filteredRecipes} />
                )
            }
            {
                !isLoading && filteredRecipes.length === 0 &&
                <EmptyMesssage msg={'There are no recipes.'} />
            }
        </MainSection>
    );
}

export default RecipesPage;