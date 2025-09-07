import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Router/Route";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
