import React from 'react';
import {Input, Button} from './Input'
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
      <Input />
      <Button />
      <ClearAllButton />
      </div>

      <div>
      <Table />
      </div>

    </div>
    
  );
}

export default App;
