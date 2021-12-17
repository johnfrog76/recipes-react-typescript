import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MyTheme from './providers/theme/theme.provider';
import RecipesProvider from './providers/recipes/recipes.provider';
import { ToastProvider } from 'react-toast-notifications';
import CustomToast from './components/molecules/toasts/toasts.component';
import AuthProvider from './providers/auth/auth.provider';
import UsersProvider from './providers/users/users.provider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UsersProvider>
        <RecipesProvider>
          <MyTheme>
            <ToastProvider components={{ Toast: CustomToast }}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ToastProvider>
          </MyTheme>
        </RecipesProvider>
      </UsersProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
