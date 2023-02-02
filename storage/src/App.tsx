import React from 'react';
import {BoxInfo, EditBoxButtons, LookUpCode} from './ViewBox'
import './App.css';
import Head from './Header';

function App() {
  return (
    <div>

      <div>
        <Head />
      </div>

      <div>
        <LookUpCode />
        <BoxInfo />
        <EditBoxButtons />
      </div>

    </div>
    
  );
}

export default App;
