import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createSelector } from "reselect";
import { getPokemonList } from "../../api/pokemonEndpoints";
import { increment } from "./filterReducer";
import { getId } from "../../utils/Utils.js";


// Here we got our Actions
const GET_POKEMONS = "/GET_POKEMONS";
const GET_POKEMONS_SUCCESS ="/GET_POKEMONS_SUCCESS";
const GET_POKEMONS_FAIL ="/GET_POKEMONS_FAIL";

const DISPLAY_BEGIN = "/DISPLAY_BEGIN";
const DISPLAY_END = "/DISPLAY_END";


const initialState = { pokemonList: [], isLoading: false, error: "" };

// Here we got our Reducers
// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POKEMONS_SUCCESS:
      const { results } = action.payload.data;
      console.log(results)
      const ResultList = results.map(pokemon => {
        const id = parseInt(getId(pokemon.url), 10);
        return { id, ...pokemon };
      });
      return {
        ...state,
        pokemonList: ResultList,
        isLoading: false,
      };
    case GET_POKEMONS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case DISPLAY_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case DISPLAY_END:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}




// Action Creators
export function FetchPokemons(payload) {
  return { type: GET_POKEMONS, payload };
}

export function loadPokemonSucceed(payload) {
  return { type: GET_POKEMONS_SUCCESS, payload };
}

export function loadPokemonsFailed(payload) {
  return { type: GET_POKEMONS_FAIL, payload };
}


export function displayNextPagePokemon() {
  return { type: DISPLAY_BEGIN };
}

export function displayMorePokemonEnd() {
  return { type: DISPLAY_END };
}

export function* fetchPokemonListSaga() {
  try {
    const response = yield call(getPokemonList, 0);
    yield put(loadPokemonSucceed(response));
  } catch (error) {
    yield put(loadPokemonsFailed(error.message));
  }
}




// Selectors
const pokemonListSelector = state =>
  state.pokemonListReducer.pokemonList;
const filterSelector = state => state.filterReducer;

export const pokemonListFilterSelector = createSelector(
  [pokemonListSelector, filterSelector],
  (pokemonList, { count }) => {
    return pokemonList.filter(pokemon => pokemon.id <= count)
  },
);

export const pokemonsCount = createSelector(
  [pokemonListSelector],
  (pokemonList) => pokemonList.length
);

function* displayMorePokemonSaga() {
  yield delay(500);
  yield put(displayMorePokemonEnd());
  yield put(increment());
}

export function* pokemonsWatcherSaga() {
  yield takeLatest(GET_POKEMONS, fetchPokemonListSaga);
  yield takeEvery(DISPLAY_BEGIN, displayMorePokemonSaga);
}


