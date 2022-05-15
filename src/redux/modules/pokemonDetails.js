import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createSelector } from "reselect";
import { getPokemonDetails } from "../../api/pokemonEndpoints";
import { increment } from "./filterDetailReducer";
import { getId} from "../../utils/Utils.js";


// Here we got our Actions
const GET_POKEMON_DETAILS = "/GET_POKEMON_DETAILS";
const GET_POKEMON_DETAILS_SUCCESS ="/GET_POKEMON_DETAILS_SUCCESS";
const GET_POKEMON_DETAILS_FAIL ="/GET_POKEMON_DETAILS_FAIL";

const DISPLAY_BEGIN = "/DISPLAY_BEGIN";
const DISPLAY_END = "/DISPLAY_END";


const initialState = { PokemonDetails: [], isLoading: false, error: "" };

// Here we got our Reducers
// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_POKEMON_DETAILS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POKEMON_DETAILS_SUCCESS:
      const { descriptions } = action.payload.data;
      const {url}=action.payload.data.highestStat
      const id = parseInt(getId(url), 10);
      //console.log(action.payload.data.descriptions)
      const ResultList = descriptions.map(description => {
        //const id = parseInt(getPokemonDetailId(description.url), 10);
        //console.log(id)
        return { id ,...description  };
      });
      
      return {
        ...state,
        PokemonDetails: ResultList,
        isLoading: false,
      };
    case GET_POKEMON_DETAILS_FAIL:
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
export function FetchPokemonDetails(payload) {
  
  return { type: GET_POKEMON_DETAILS, payload };
}

export function loadPokemonSucceed(payload) {
  
  return { type: GET_POKEMON_DETAILS_SUCCESS, payload };
}

export function loadPokemonsFailed(payload) {
  return { type: GET_POKEMON_DETAILS_FAIL, payload };
}


export function displayNextPagePokemon() {
  return { type: DISPLAY_BEGIN };
}

export function displayMorePokemonEnd() {
  return { type: DISPLAY_END };
}


export function* fetchPokemonDetailsSaga() {
  try {
    const response = yield call(getPokemonDetails, 1);
    yield put(loadPokemonSucceed(response));
  } catch (error) {
    yield put(loadPokemonsFailed(error.message));
  }
}



// Selectors
const pokemonListSelector = state =>
  state.pokemonDetailsReducer.PokemonDetails;
const filterSelector = state => state.filterDetailReducer;

export const pokemonListFilterSelector = createSelector(
  [pokemonListSelector, filterSelector],
  (PokemonDetails, { count }) => {
    //console.log(count)
    return PokemonDetails.filter(pokemon => pokemon.id <= count)
  },
);

export const pokemonsCount = createSelector(
  [pokemonListSelector],
  (PokemonDetails) => PokemonDetails.id
);

function* displayMorePokemonSaga() {
  yield delay(500);
  yield put(displayMorePokemonEnd());
  yield put(increment());
}

export function* pokemonDetailsWatcherSaga() {
  yield takeLatest(GET_POKEMON_DETAILS, fetchPokemonDetailsSaga);
  yield takeEvery(DISPLAY_BEGIN, displayMorePokemonSaga);
}


