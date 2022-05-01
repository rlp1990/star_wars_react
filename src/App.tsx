import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StarWarsCharacters from "./components/star-wars-characters/star-wars-characters";
import { StarWarsCharacterDetails } from "./components/star-wars-character-details/star-wars-character-details";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StarWarsCharacters />}></Route>
          <Route
            path="/start-wars-character-details/:id"
            element={<StarWarsCharacterDetails />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
