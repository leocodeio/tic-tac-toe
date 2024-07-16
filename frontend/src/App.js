import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountContextProvider } from "./context/AccountContext";
import Start from "./screens/Start";
import Play from "./screens/Play";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AccountContextProvider>
          <Routes>
            <Route path="/" element={<Start/>} />
            <Route path="/play" element={<Play />} />
          </Routes>
        </AccountContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
