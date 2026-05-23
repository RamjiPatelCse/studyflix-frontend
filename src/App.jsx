import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Update from "./pages/Update";
import Player from "./pages/Player";
import Watch from "./pages/Watch";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/update"
          element={<Update />}
        />

        <Route
          path="/player/:id"
          element={<Player />}
        />

        <Route
          path="/watch"
          element={<Watch />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
