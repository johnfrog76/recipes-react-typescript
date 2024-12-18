import { useState, useContext } from "react";

import { MainSection } from "../../components/atoms/main-section/main-section.component";
import PageTitle from "../../components/atoms/page-title/page-title.component";
import RecipeList from "../../components/molecules/recipes-list/recipes-list.component";
import BulkOperationControls from "../../components/atoms/bulk-opperation-controls/bulk-opperation-controls.component";
import ListGridToggleButton from "../../components/atoms/list-grid-toggle/list-grid-toggle.component";
import CheckBoxPlain from "../../components/atoms/checkbox-plain/checkbox-plain.component";
import { RecipesContext } from "../../providers/recipes/recipes.provider";
import { AuthContext } from "../../providers/auth/auth.provider";
import RecipeCardList from "../../components/molecules/recipes-category-card-list/recipes-category-card-list.component";
import {
  StyledTitleWrapper,
  StyledSpinnerWrap,
  StyledToolBar,
  StyledCheckAllWrapper,
} from "./recipes.styles";
import EmptyMesssage from "../../components/atoms/empty-message/empty-message.component";
import Spinner from "../../components/molecules/spinner/spinner.component";
import { iRecipe } from "../../interfaces/recipe/recipe.interface";

const checkMixedList = (
  bulkList: string[],
  recipeItems: iRecipe[],
  userId: string | undefined
) => {
  let ret = false;
  if (!userId) {
    return ret;
  }

  for (let i = 0; i < recipeItems.length; i++) {
    const item = recipeItems[i];

    if (
      bulkList.findIndex(
        (bulkItem) => bulkItem === item._id && item.user_id !== userId
      ) !== -1
    ) {
      ret = true;
      break;
    }
  }
  return ret;
};

const RecipesPage = () => {
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [isMixedList, setIsMixedList] = useState<boolean>(false);
  const { recipeItems, isLoading } = useContext(RecipesContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [bulkList, setBulkList] = useState<string[]>([]);
  const [bulkCount, setBulkCount] = useState<number>(0);
  const [isBulkSelected, setIsBulkSelected] = useState<boolean>(false);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState<boolean>(false);

  const handleToggleGridView = () => {
    setIsGridView(!isGridView);
    setSelectMode(false);
    setBulkList([]);
    setIsBulkSelected(false);
    setIsSelectAllChecked(false);
    setBulkCount(0);
  };

  const handleEditMode = () => {
    setSelectMode(!selectMode);
    setBulkList([]);
    setIsBulkSelected(false);
    setIsSelectAllChecked(false);
    setBulkCount(0);
  };

  const handleToggleAllCheckboxes = (
    value: string | undefined,
    checked: boolean
  ) => {
    setBulkList([]);
    if (
      bulkList.length > 0 &&
      bulkList.length !== recipeItems.length &&
      isBulkSelected
    ) {
      setIsBulkSelected(false);
      setIsSelectAllChecked(checked);
      setTimeout(() => {
        setBulkCount(recipeItems.length);
        setIsBulkSelected(checked);
      });
    } else {
      setBulkList([]);
      setIsBulkSelected(checked);
    }
  };

  const handleSelectChange = (id: string | undefined, checked: boolean) => {
    if (id) {
      let templist = bulkList;
      if (checked) {
        templist.push(id);
      } else {
        let idx = templist.findIndex((item) => item === id);
        templist.splice(idx, 1);
      }
      setBulkList(templist);
      setBulkCount(templist.length);
      let isMixedTemp = checkMixedList(bulkList, recipeItems, user?.userId);
      setIsMixedList(isMixedTemp);

      if (bulkList.length === recipeItems.length) {
        setIsSelectAllChecked(true);
      } else {
        setIsSelectAllChecked(false);
      }
    }
  };

  return (
    <MainSection>
      <StyledTitleWrapper>
        <PageTitle>Recipes ({recipeItems.length})</PageTitle>
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
          <ListGridToggleButton
            grid={isGridView}
            onClick={() => handleToggleGridView()}
          />
        </StyledToolBar>
      </StyledTitleWrapper>
      {isGridView && isLoggedIn && selectMode && (
        <StyledCheckAllWrapper>
          <CheckBoxPlain
            id="selectAllItems"
            inputChangeHandler={handleToggleAllCheckboxes}
            value=""
            isChecked={isSelectAllChecked}
          />
        </StyledCheckAllWrapper>
      )}
      {isLoading && (
        <StyledSpinnerWrap>
          <Spinner />
        </StyledSpinnerWrap>
      )}
      {!isLoading && recipeItems.length !== 0 && isGridView ? (
        <RecipeCardList
          recipes={recipeItems}
          selectMode={selectMode}
          isBulkSelected={isBulkSelected}
          onSelectChange={handleSelectChange}
        />
      ) : (
        <RecipeList recipes={recipeItems} />
      )}
      {!isLoading && recipeItems.length === 0 && (
        <EmptyMesssage msg={"There are no recipes."} />
      )}
    </MainSection>
  );
};

export default RecipesPage;
