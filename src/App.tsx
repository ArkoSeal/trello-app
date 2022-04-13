import React from 'react';
import { Fragment } from 'react';

import './App.css';
import CardContainer from './components/cards/CardContainer';
import Header from './components/layouts/Header';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <CardContainer />
      </main>
    </Fragment>
  );
}

export default App;
