import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {FetchPokemonDetails , displayNextPagePokemon ,pokemonListFilterSelector, pokemonsCount} from "../redux/modules/pokemonDetails"
import LoaderList from "./LoaderList";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:250,
  maxWidth: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PokemonListItemsdetails = props => {
  const {
    fetchActionCreator,
    isLoading,
    error,
    pokemonDetails,
    
  } = props;

  useEffect(() => {
    fetchActionCreator();
  }, [fetchActionCreator]);

 
  if (_.isEmpty(pokemonDetails) && isLoading) return <LoaderList />;
  if (error) return <p>Error {console.log(error)}</p>;
  return (
    <>
        <Box sx={style}>
          
          <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        >
          <Card sx={{ maxWidth: 200 , justifyContent:'center' ,alignContent:'center' , marginBottom:2 }}>
            <CardMedia
            component="img"
            height="140"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}        alt="green iguana"
          />
          
          </Card>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Id : {props.id}
          </Typography>
          <Typography id="modal-modal-description" >
          Name : {props.name}
          </Typography>
          <Typography style={{justifyContent:'center' ,alignItems:'center', alignContent:'center'}} id="modal-modal-description" >
          All the characteristic in differents languages
          </Typography>
          
          {isLoading && (
          <Stack sx={{ color: 'grey.500' , display: 'flex' ,justifyContent: 'center'}} spacing={2} direction="row">
          
          <CircularProgress color="success" />
          
          </Stack>
          )}
          {pokemonDetails && Object.keys(pokemonDetails).map((keyName, i) => (
            
            
            <li style={{justifyContent:'left' ,alignItems:'left', alignContent:'left'}} key={keyName}>
                <span className="input-label">{pokemonDetails[keyName].description} in {pokemonDetails[keyName].language.name}</span>
            </li>
            
        ))}
        
        </Grid>
          
    </Box>
     
      </>
    )
  };

const mapStateToProps = state => ({
  isLoading: state.pokemonDetailsReducer.isLoading,
  error: state.pokemonDetailsReducer.error,
  pokemonDetails: pokemonListFilterSelector(state),
  totalPokemonCount: pokemonsCount(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchActionCreator: FetchPokemonDetails,
      displayMore: displayNextPagePokemon,
    },
    dispatch,
  );
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonListItemsdetails);

