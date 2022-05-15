import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { FetchPokemons, displayNextPagePokemon, pokemonListFilterSelector, pokemonsCount } from "../redux/modules/pokemonList";
import LoaderList from "./LoaderList";
import PokemonListItem from "./PokemonListItem";

const ListOfPokemons = props => {
  const {
    fetchActionCreator,
    displayMore,
    isLoading,
    error,
    pokemonList,
    totalPokemonCount
  } = props;

  useEffect(() => {
    fetchActionCreator();
  }, [fetchActionCreator]);

  const handleScroll = event => {
    const element = event.target;
    if ((element.scrollHeight - element.scrollTop === element.clientHeight) && totalPokemonCount > pokemonList.length) {
      displayMore();
    }
  };

  if (_.isEmpty(pokemonList) && isLoading) return <LoaderList />;
  if (error) return <p>Error {console.log(error)}</p>;
  return (
    <>
      <div >
      <p >Displaying {pokemonList.length} pokemon of {totalPokemonCount}</p>

        <div
          className="row"
          onScroll={handleScroll}
          style={{ height: "500px", overflow: "auto" }}
        >
          {_.isEmpty(pokemonList) && <p>No results for this search</p>}
          {pokemonList.map(pokemon => {
            const { id, name } = pokemon;
            return (
              <div key={pokemon.url} className="col-sm-3">
                
                <PokemonListItem id={id} name={name} />
              </div>
            );
          })}
        </div>
        {isLoading && (
          <Stack sx={{ color: 'grey.500' , display: 'flex' ,justifyContent: 'center'}} spacing={2} direction="row">
          
          <CircularProgress color="success" />
          
          </Stack>
        )}
      </div>
      </>
    )
  };

const mapStateToProps = state => ({
  isLoading: state.pokemonListReducer.isLoading,
  error: state.pokemonListReducer.error,
  pokemonList: pokemonListFilterSelector(state),
  totalPokemonCount: pokemonsCount(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchActionCreator: FetchPokemons,
      displayMore: displayNextPagePokemon,
    },
    dispatch,
  );
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListOfPokemons);
