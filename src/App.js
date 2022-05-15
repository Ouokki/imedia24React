import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import ListOfPokemons from './components/ListOfPokemons';


const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ListOfPokemons />
      </div>
    </Provider>
  );
}

export default App;
