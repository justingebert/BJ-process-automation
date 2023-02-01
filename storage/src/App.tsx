import React from 'react';
import {BoxInfo, EditBoxButtons, LookUpCode} from './ViewBox'
import './App.css';
import ClearAllButton from "./Clear"
import Head from './Header';
import {Table} from "./Table"

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
