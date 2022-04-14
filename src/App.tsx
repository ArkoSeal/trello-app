import React from 'react';

import './App.css';
import CardContainer from './components/cards/CardContainer';
import Header from './components/layouts/Header';
import { CardContextProvider } from './store/card-context';


function App() {
  return (
    <CardContextProvider>
      <Header />
      <main>
        <CardContainer />
      </main>
    </CardContextProvider>
  );
}

export default App;
