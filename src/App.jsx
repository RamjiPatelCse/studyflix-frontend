import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Update from "./pages/Update";
import Player from "./pages/Player";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/update" element={<Update />} />

        <Route path="/player" element={<Player />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
