import React, { useState } from 'react';
import {BoxInfo, EditBoxButtons, LookUpCode} from './ViewBox'
import './styles/App.css';
import Head from './Header';

function App() {
  const [mode,setMode] = useState("view");


  return (
    <div>
      <Head />
      <LookUpCode />
    </div>
  );
}

export default App;
