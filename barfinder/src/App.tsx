import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Panel from "./components/MainPanel"
import DrinkPanel from "./components/drink/DrinkPanel"
import IngredientsPanel from "./components/ingredient/IngredientsPanel"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Panel></Panel>
      </div>
    </BrowserRouter>
  )
}

export default App
