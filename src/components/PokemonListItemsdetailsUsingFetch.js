import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
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

export default function PokemonListItemsdetails({ id, name }) {
  const [description, setDesctiption]= useState(null)
  const [isLoading, setIsLoading]= useState(null)

  function onSuccess(description) {
    //dispatch({ type: actionTypes.FETCHED_DESCRIPTION, payload: description})
      console.log(description)
      setDesctiption(description)
      setIsLoading(false)
      return description
  }
  // lets see the pokemon description 
  async function fetchDescription(id) {
    console.log("ASDASDSA")
    console.log(id)
    setIsLoading(true)
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/characteristic/${id}`);
      const json = await response.json();
      console.log(json)
      const description = json.descriptions;
      return onSuccess(description);
  } catch (error) {
      return error
  }
    
 }

  
  return (
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
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}        alt="green iguana"
          />
          
          </Card>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Id : {id}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Name : {name}
          </Typography>
          <CardActions>
            <Button onClick={() => fetchDescription(id)} size="small">Do you wanna see its caracteristics ?</Button>
            
          </CardActions>
          {isLoading && (
          <Stack sx={{ color: 'grey.500' , display: 'flex' ,justifyContent: 'center'}} spacing={2} direction="row">
          
          <CircularProgress color="success" />
          
          </Stack>
          )}
          {description && Object.keys(description).map((keyName, i) => (
            
            
            <li style={{justifyContent:'left'}} key={keyName}>
                <span className="input-label">{description[keyName].description}</span>
            </li>
            
        ))}
        </Grid>
          
    </Box>
  )
}
