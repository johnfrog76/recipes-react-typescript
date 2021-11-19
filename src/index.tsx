import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MyTheme from './providers/theme/theme.provider';
import RecipesProvider from './providers/recipes/recipes.provider';

ReactDOM.render(
  <React.StrictMode>
    <RecipesProvider>
      <MyTheme>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyTheme>
    </RecipesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
