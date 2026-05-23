import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Player from "./pages/Player";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/player" element={<Player />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
