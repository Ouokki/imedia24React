import _ from "lodash";
import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import PokemonListItemsdetails from "./PokemonListItemsdetails";


const PokemonListItem = ({ id, name }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div style={{justifyContent:'center'}}>
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
          <div className="text-center">
            <p>{_.capitalize(name)}</p>
          </div>
          <CardActions>
            <Button onClick={handleOpen} size="small">Click to see details</Button>
            
          </CardActions>
          </Card>
        </Grid>
        {/*the modal for pokemon details*/}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <PokemonListItemsdetails id={id} name={name} />
      </Modal>
    </div>
    
  );
};

export default PokemonListItem;
