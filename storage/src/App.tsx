import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/App.css';
import Head from './Header';
import { ViewBoxes } from './ViewBoxes';
import { EditBox } from './EditBox';
import { ViewBox } from './ViewBox';

function App() {
  const [mode,setMode] = useState("view");


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Head />}>
          <Route index element={<ViewBoxes />} />
          <Route path="/info/:id" element={<ViewBox />}/> 
          <Route path="/edit/id" element={<EditBox />} />
        </Route>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
