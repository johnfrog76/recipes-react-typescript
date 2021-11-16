import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/home.component';
import RecipesPage from './pages/recipes/recipes.component';
import AddRecipePage from './pages/add-recipe/add-recipe.component';
import RecipeDetailPage from './pages/view-recipe/view-recipe.component';
import RecipesByCategory from './pages/recipes-by-category/recipes-by-category.component';
import { StyledOuterDiv } from './App.styles';
import PrimaryNav from './components/molecules/primary-nav/primary.nav.component';

class App extends React.Component {

  render() {
    return (
      <StyledOuterDiv>
        <PrimaryNav />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/add-recipe' element={<AddRecipePage />} />
          <Route path='/recipes' element={<RecipesPage />} />
          <Route path='/recipes/:id' element={<RecipeDetailPage />} />
          <Route path='/recipes/category/:cat_id' element={<RecipesByCategory />} />
        </Routes>
      </StyledOuterDiv>
    );
  }
}

export default App;
