import { all } from "redux-saga/effects";
import { pokemonsWatcherSaga } from "./modules/pokemonList";
import {pokemonDetailsWatcherSaga} from "./modules/pokemonDetails"

export default function* rootSaga() {
  yield all([
    pokemonsWatcherSaga(),
    pokemonDetailsWatcherSaga()
  ]);
}
