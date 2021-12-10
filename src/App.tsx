import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/home.component';
import RecipesPage from './pages/recipes/recipes.component';
import AddRecipePage from './pages/add-recipe/add-recipe.component';
import RecipeDetailPage from './pages/view-recipe/view-recipe.component';
import EditRecipePage from './pages/edit-recipe/edit-recipe.component';
import RecipesByCategory from './pages/recipes-by-category/recipes-by-category.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import SignUpPage from './pages/sign-up/sign-up.component';
import UsersPage from './pages/users/users.component';
import { StyledOuterDiv } from './App.styles';
import PrimaryNav from './components/molecules/primary-nav/primary.nav.component';
import UserRecipesPage from './pages/user-recipes/user-recipes.component';

class App extends React.Component {

  render() {
    return (
      <StyledOuterDiv>
        <PrimaryNav />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/add-recipe' element={<AddRecipePage />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/user-recipes/:id' element={<UserRecipesPage />} />
          <Route path='/recipes' element={<RecipesPage />} />
          <Route path='/sign-in' element={<SignInSignUpPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/recipes/:id' element={<RecipeDetailPage />} />
          <Route path='/edit-recipe/:id' element={<EditRecipePage />} />
          <Route path='/recipes/category/:cat_id' element={<RecipesByCategory />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </StyledOuterDiv>
    );
  }
}

export default App;
