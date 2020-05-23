import React from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

const App = () => (
  <div className="app">
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  </div>
);

export default App;
