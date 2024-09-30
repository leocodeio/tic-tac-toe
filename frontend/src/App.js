import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountContextProvider } from "./context/AccountContext";
import Start from "./screens/Start";
import Play from "./screens/Play";
import TicTacToe from "./screens/TicTacToe";
import { SocketContextProvider } from "./context/SocketContext";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AccountContextProvider>
          <SocketContextProvider>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/play" element={<Play />} />
              <Route path="/ttt" element={<TicTacToe />} />
            </Routes>
          </SocketContextProvider>
        </AccountContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
