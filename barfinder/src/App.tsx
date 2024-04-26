import { BrowserRouter } from "react-router-dom"
import "./App.css"
import Panel from "./components/MainPanel"
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
