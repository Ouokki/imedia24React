import { combineReducers } from "redux";
import filterReducer from "./modules/filterReducer";
import filterDetailReducer from "./modules/filterDetailReducer";
import pokemonListReducer from "./modules/pokemonList";
import pokemonDetailsReducer from "./modules/pokemonDetails"


const rootReducer = combineReducers({
  filterReducer,
  filterDetailReducer,
  pokemonListReducer,
  pokemonDetailsReducer

});

export default rootReducer;
