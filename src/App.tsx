
import React, { useState } from 'react';
import './App.css';

import { Route } from 'react-router';
import MyTheme from './provider/theme/theme.provider'
import { HomePage } from './pages/home/home.component';


const App = () => {

  return (
    <MyTheme>
      <HomePage />
    </MyTheme>
  );
}

export default App;
