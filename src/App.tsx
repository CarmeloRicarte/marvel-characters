import { Redirect, Route } from "wouter";
import "./App.css";
import { CharactersPage } from "./marvel/pages/Characters/Characters";

function App() {
  return (
    <>
      <Route path="/characters">
        <CharactersPage />
      </Route>
      <Route path="**">
        <Redirect to="/characters" />
      </Route>
    </>
  );
}

export default App;
