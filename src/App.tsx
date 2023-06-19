import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Router } from "react-router-dom";
import Home from "./pages/Home";
import Routes from "./routes/routes";
function App() {
  return <Routes />;
}

export default App;
