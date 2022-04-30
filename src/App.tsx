import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StarWarsCharacters from "./components/star-wars-characters/star-wars-characters";
import { StarWarsCharacterDetails } from "./components/start-wars-character-details/start-wars-character-details";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StarWarsCharacters />}></Route>
          <Route
            path="/start-wars-character-details/:id"
            element={<StarWarsCharacterDetails />}
          ></Route>
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
