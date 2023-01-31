import React from 'react';
import {InputCode, LookupButton} from './Input'
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
      
      <InputCode />
      <LookupButton />
      <ClearAllButton />
      </div>

      <div>
      <Table />
      </div>

    </div>
    
  );
}

export default App;
