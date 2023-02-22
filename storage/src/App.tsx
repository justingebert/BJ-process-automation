import React, { useState } from 'react';
import {BoxInfo, EditBoxButtons, LookUpCode} from './ViewBox'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/App.css';
import { ViewBox } from './ViewBox';
import Head from './Header';

function App() {
  const [mode,setMode] = useState("view");


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/Kisten" element={<Head />}>
          <Route index element={<ViewBoxes />} />
          <Route path="/info/:id" element={<ViewBox />} />
          <Route path="/edit/:id" element={<EditBox />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>

    {/* <div>
      <Head />
      <LookUpCode />
    </div> */}
  );
}

export default App;
